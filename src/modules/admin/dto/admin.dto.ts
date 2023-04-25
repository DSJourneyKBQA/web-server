import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class AdminVerifyOnlyDto {
  @ApiProperty({ example: 'token', description: 'token' })
  @IsNotEmpty({ message: 'token不能为空' })
  token: string;
}

export class AdminCommonListDto {
  @ApiProperty({ example: 'token', description: 'token' })
  @IsNotEmpty({ message: 'token不能为空' })
  token: string;

  @ApiProperty({ example: '1', description: '页数' })
  @IsInt({ message: 'page格式错误' })
  @Type(() => Number)
  page: number;
}

export class AdminUserOpDto {
  @ApiProperty({ example: 'token', description: 'token' })
  @IsNotEmpty({ message: 'token不能为空' })
  token: string;

  @ApiProperty({ example: '1', description: '用户ID' })
  @IsNotEmpty({ message: 'uid不能为空' })
  @IsInt({ message: 'uid格式错误' })
  @Type(() => Number)
  uid: number;
}

export class AdminPostOpDto {
  @ApiProperty({ example: 'token', description: 'token' })
  @IsNotEmpty({ message: 'token不能为空' })
  token: string;

  @ApiProperty({ example: '1', description: '文章ID' })
  @IsNotEmpty({ message: 'pid不能为空' })
  @IsInt({ message: 'pid格式错误' })
  @Type(() => Number)
  pid: number;
}

export class AdminCommentOpDto {
  @ApiProperty({ example: 'token', description: 'token' })
  @IsNotEmpty({ message: 'token不能为空' })
  token: string;

  @ApiProperty({ example: '1', description: '评论ID' })
  @IsNotEmpty({ message: 'cid不能为空' })
  @IsInt({ message: 'cid格式错误' })
  @Type(() => Number)
  cid: number;
}

export class AdminUpdateDataDto {
  @ApiProperty({ example: 'token', description: 'token' })
  @IsNotEmpty({ message: 'token不能为空' })
  token: string;

  @ApiProperty({ example: '{}', description: '数据' })
  @IsNotEmpty({ message: '数据不能为空' })
  data: string;
}

export class AdminInitChapterDto {
  @ApiProperty({ example: 'token', description: 'token' })
  @IsNotEmpty({ message: 'token不能为空' })
  token: string;

  @ApiProperty({ example: '章节标题', description: '章节标题' })
  @IsNotEmpty({ message: '章节标题不能为空' })
  title: string;

  @ApiProperty({ example: '章节描述', description: '章节描述' })
  @IsNotEmpty({ message: '章节描述不能为空' })
  description: string;

  @ApiProperty({ example: '章节内容', description: '章节内容' })
  @IsNotEmpty({ message: '章节内容不能为空' })
  content: string;
}

export class AdminEditChapterDto {
  @ApiProperty({ example: 'token', description: 'token' })
  @IsNotEmpty({ message: 'token不能为空' })
  token: string;

  @ApiProperty({ example: '1', description: '章节ID' })
  @IsNotEmpty({ message: '章节ID不能为空' })
  @IsInt({ message: '章节ID格式错误' })
  @Type(() => Number)
  cid: number;

  @ApiProperty({ example: '章节标题', description: '章节标题' })
  @IsNotEmpty({ message: '章节标题不能为空' })
  title: string;

  @ApiProperty({ example: '章节描述', description: '章节描述' })
  @IsNotEmpty({ message: '章节描述不能为空' })
  description: string;

  @ApiProperty({ example: '章节内容', description: '章节内容' })
  @IsNotEmpty({ message: '章节内容不能为空' })
  content: string;
}
