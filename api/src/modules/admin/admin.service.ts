import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { RequestsService } from '../requests/requests.service';
import { TelegramService } from '../telegram/telegram.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly usersService: UsersService,
    private readonly requestsService: RequestsService,
    private readonly telegramService: TelegramService,
  ) {}

  getPendingUsers() {
    return this.requestsService.findPending();
  }

  getUsers() {
    return this.usersService.findAll();
  }

  async approveRequest(requestId: string) {
    const accessRequest = await this.requestsService.updateStatus(
      requestId,
      'approved',
    );

    if (!accessRequest) {
      throw new NotFoundException('Access request not found');
    }

    const userId =
      accessRequest.userId instanceof Types.ObjectId
        ? accessRequest.userId.toString()
        : String(accessRequest.userId);

    const user = await this.usersService.setApproval(userId, true);
    await this.telegramService.sendApprovalNotification(user);

    return { accessRequest, user };
  }

  async rejectRequest(requestId: string) {
    const accessRequest = await this.requestsService.updateStatus(
      requestId,
      'rejected',
    );

    if (!accessRequest) {
      throw new NotFoundException('Access request not found');
    }

    const userId =
      accessRequest.userId instanceof Types.ObjectId
        ? accessRequest.userId.toString()
        : String(accessRequest.userId);

    const user = await this.usersService.setApproval(userId, false);

    return { accessRequest, user };
  }
}
