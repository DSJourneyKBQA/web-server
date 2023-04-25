import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostModule } from './modules/post/post.module';
import { AdminModule } from './modules/admin/admin.module';
import { StudyModule } from './modules/study/study.module';

@Module({
  imports: [UserModule, PrismaModule, PostModule, AdminModule, StudyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
