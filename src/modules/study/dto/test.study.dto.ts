import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SubmitTestDto {
  @ApiProperty({ example: 'token', description: 'token' })
  @IsNotEmpty({ message: 'token不能为空' })
  token: string;

  @ApiProperty({ example: 1, description: '题目ID' })
  questionId: number;

  @ApiProperty({ example: 'test', description: '测试内容' })
  content: string;
}
