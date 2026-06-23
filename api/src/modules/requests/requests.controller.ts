import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestsService } from './requests.service';

@Controller('requests')
@UseGuards(JwtAuthGuard)
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post('access')
  requestAccess(@Req() req: { user: { userId: string } }) {
    return this.requestsService.requestAccess(req.user.userId);
  }

  @Get('status')
  getStatus(@Req() req: { user: { userId: string } }) {
    return this.requestsService.getStatus(req.user.userId);
  }
}
