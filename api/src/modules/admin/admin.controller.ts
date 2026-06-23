import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../auth/guards/admin.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminService } from './admin.service';

@Controller('admin')
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('pending-users')
  getPendingUsers() {
    return this.adminService.getPendingUsers();
  }

  @Get('users')
  getUsers() {
    return this.adminService.getUsers();
  }

  @Patch('approve/:id')
  approve(@Param('id') id: string) {
    return this.adminService.approveRequest(id);
  }

  @Patch('reject/:id')
  reject(@Param('id') id: string) {
    return this.adminService.rejectRequest(id);
  }
}
