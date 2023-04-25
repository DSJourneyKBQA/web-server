import { Injectable, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResultData } from 'src/type/result';
import { SubmitTestDto } from './dto/test.study.dto';
import { verifyToken } from 'src/utils/verify';
import { map } from 'rxjs/operators';
import { GetChapterListDto } from './dto/getchapter.study.dto';
import { CompleteChapterDto } from './dto/cpchapter.study.dto';

@Injectable()
export class StudyService {
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async getChapterList(params: GetChapterListDto) {
    const { token, uid } = params;
    const payload = await verifyToken(token);
    if (payload.id == -1) {
      return ResultData.fail(401, '无效Token');
    }

    const chapters = JSON.parse(
      (
        await this.prisma.option.findUnique({
          where: {
            key: 'data-chapters',
          },
        })
      ).value,
    );

    const userComplete = await this.prisma.studyRecord.findMany({
      where: {
        uid: Number(uid),
        valid: true,
      },
      select: {
        cid: true,
        score: true,
      },
    });

    return ResultData.ok({ chapterData: chapters, userData: userComplete });
  }

  async getChapterContent(id: number) {
    const chapter = await this.prisma.chapter.findUnique({
      where: {
        cid: id,
      },
      select: {
        cid: true,
        title: true,
        description: true,
        content: true,
      },
    });
    if (!chapter) {
      return ResultData.fail(404, '章节不存在');
    }
    return ResultData.ok(chapter);
  }

  async submitTest(params: SubmitTestDto) {
    const { token, questionId, content } = params;
    const payload = await verifyToken(token);
    if (payload.id == -1) {
      return ResultData.fail(401, '无效Token');
    }
    try {
      const res = await this.httpService
        .post(
          'http://oj-server.voup.cn/api/test/getTest',
          {
            test: content,
            id: questionId,
          },
          {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            timeout: 10000,
          },
        )
        .pipe(map((res) => res.data))
        .toPromise();
      await this.prisma.testRecord.create({
        data: {
          uid: payload.id,
          qid: questionId,
          code: content,
          result: JSON.stringify(res),
          pass: res.code === 0,
        },
      });
      return ResultData.ok(res);
    } catch (error) {
      console.error(error);
      await this.prisma.testRecord.create({
        data: {
          uid: payload.id,
          qid: questionId,
          code: content,
          result: '测试服务器错误',
          pass: false,
        },
      });
      return ResultData.fail(500, '测试服务器错误');
    }
  }

  async completeChapter(params: CompleteChapterDto) {
    const { token, cid } = params;
    const payload = await verifyToken(token);
    if (payload.id == -1) {
      return ResultData.fail(401, '无效Token');
    }
    const isPass = await this.prisma.studyRecord.findFirst({
      where: {
        uid: Number(payload.id),
        cid: cid,
        valid: true,
      },
    });
    if (isPass) {
      return ResultData.fail(400, '已经完成该章节');
    }
    const chapter = await this.prisma.chapter.findUnique({ where: { cid } });
    const tests = JSON.parse(chapter.tests) as number[];
    if (tests.length === 0) {
      await this.prisma.studyRecord.create({
        data: {
          uid: Number(payload.id),
          cid: cid,
          score: 100,
        },
      });
      return ResultData.ok();
    }
    const testRecord = await this.prisma.testRecord.findMany({
      where: {
        uid: Number(payload.id),
        pass: true,
      },
    });
    let canPass = true;
    console.log(testRecord);
    tests.forEach((test) => {
      if (!testRecord.find((record) => record.qid === test)) {
        canPass = false;
        console.log(test);
      }
    });
    if (!canPass) {
      return ResultData.fail(400, '未完成本章所有测试');
    }
    await this.prisma.studyRecord.create({
      data: {
        uid: Number(payload.id),
        cid: cid,
        score: 100,
      },
    });
    return ResultData.ok();
  }

  async getGatewayServerVersion() {
    const query = await this.prisma.option.findUnique({
      where: {
        key: 'data-gateway-version',
      },
    });
    if (!query) {
      return 'latest';
    }
    return query.value;
  }
}
