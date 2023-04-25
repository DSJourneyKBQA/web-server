import { Module } from '@nestjs/common';
import { StudyController } from './study.controller';
import { StudyService } from './study.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [StudyController],
  providers: [StudyService],
  imports: [PrismaModule, HttpModule],
})
export class StudyModule {}
