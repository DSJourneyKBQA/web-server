import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { StudyService } from './study.service';
import { SubmitTestDto } from './dto/test.study.dto';
import { GetChapterListDto } from './dto/getchapter.study.dto';
import { CompleteChapterDto } from './dto/cpchapter.study.dto';

@ApiTags('学习系统')
@Controller('study')
export class StudyController {
  constructor(private readonly studyService: StudyService) {}

  @Post('/getChapterList')
  getStudyList(@Body() params: GetChapterListDto) {
    return this.studyService.getChapterList(params);
  }

  @Get('/getChapterContent')
  @ApiQuery({ name: 'id', description: '章节ID', example: 1 })
  getChapterContent(@Query() params: { id: number }) {
    return this.studyService.getChapterContent(Number(params.id));
  }

  @Post('/submitTest')
  submitTest(@Body() params: SubmitTestDto) {
    return this.studyService.submitTest(params);
  }

  @Post('/completeChapter')
  completeChapter(@Body() params: CompleteChapterDto) {
    return this.studyService.completeChapter(params);
  }

  @Get('/getDSServerVersion')
  getGatewayServerVersion() {
    return this.studyService.getDSServerVersion();
  }
}
