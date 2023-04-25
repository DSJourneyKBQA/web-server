import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import {
  AdminCommentOpDto,
  AdminCommonListDto,
  AdminEditChapterDto,
  AdminInitChapterDto,
  AdminPostOpDto,
  AdminUpdateDataDto,
  AdminUserOpDto,
  AdminVerifyOnlyDto,
} from './dto/admin.dto';
@ApiTags('管理系统')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/getDashboardData')
  getDashboardData(@Body() params: AdminVerifyOnlyDto) {
    return this.adminService.getDashboardData(params.token);
  }

  @Post('/getUserList')
  getUserList(@Body() params: AdminCommonListDto) {
    const { token, page } = params;
    return this.adminService.getUserList(token, page);
  }

  @Post('/deleteUser')
  deleteUserById(@Body() params: AdminUserOpDto) {
    const { token, uid } = params;
    return this.adminService.deleteUserById(token, uid);
  }

  @Post('/banUser')
  banUser(@Body() params: AdminUserOpDto) {
    const { token, uid } = params;
    return this.adminService.banUserById(token, uid);
  }

  @Post('/unbanUser')
  unbanUser(@Body() params: AdminUserOpDto) {
    const { token, uid } = params;
    return this.adminService.banUserById(token, uid, true);
  }

  @Post('/getPostList')
  getPostList(@Body() params: AdminCommonListDto) {
    const { token, page } = params;
    return this.adminService.getPostList(token, page);
  }

  @Post('/deletePost')
  deletePost(@Body() params: AdminPostOpDto) {
    const { token, pid } = params;
    return this.adminService.deletePost(token, pid);
  }

  @Post('/prohibitPostComment')
  prohibitPostComment(@Body() params: AdminPostOpDto) {
    const { token, pid } = params;
    return this.adminService.editPostComment(token, pid, false);
  }

  @Post('/allowPostComment')
  allowPostComment(@Body() params: AdminPostOpDto) {
    const { token, pid } = params;
    return this.adminService.editPostComment(token, pid, true);
  }

  @Post('/getCommentList')
  getCommentList(@Body() params: AdminCommonListDto) {
    const { token, page } = params;
    return this.adminService.getCommentList(token, page);
  }

  @Post('/deleteComment')
  deleteComment(@Body() params: AdminCommentOpDto) {
    const { token, cid } = params;
    return this.adminService.deleteCommentById(token, cid);
  }

  @Post('/banComment')
  banComment(@Body() params: AdminCommentOpDto) {
    const { token, cid } = params;
    return this.adminService.tagComment(token, cid, true);
  }

  @Post('/approveComment')
  approveComment(@Body() params: AdminCommentOpDto) {
    const { token, cid } = params;
    return this.adminService.tagComment(token, cid);
  }

  @Post('/getChapterData')
  getChapterData(@Body() params: AdminVerifyOnlyDto) {
    const { token } = params;
    return this.adminService.getChapterData(token);
  }

  @Post('/updateChapterData')
  updateChapterData(@Body() params: AdminUpdateDataDto) {
    const { token, data } = params;
    return this.adminService.updateChapterData(token, data);
  }

  @Post('/initChapter')
  initChapter(@Body() params: AdminInitChapterDto) {
    const { token, title, description, content } = params;
    return this.adminService.initChapter(token, title, description, content);
  }

  @Post('/editChapter')
  editChapter(@Body() params: AdminEditChapterDto) {
    const { token, cid, title, description, content } = params;
    return this.adminService.editChapter(
      token,
      cid,
      title,
      description,
      content,
    );
  }
}
