import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import {
  AccessRequest,
  AccessRequestDocument,
  AccessRequestStatus,
} from './schemas/access-request.schema';

@Injectable()
export class RequestsService {
  constructor(
    @InjectModel(AccessRequest.name)
    private accessRequestModel: Model<AccessRequestDocument>,
  ) {}

  async requestAccess(userId: string) {
    const existingRequest = await this.accessRequestModel
      .findOne({ userId: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .exec();

    if (existingRequest && existingRequest.status !== 'rejected') {
      return existingRequest;
    }

    return this.accessRequestModel.create({
      userId: new Types.ObjectId(userId),
      status: 'pending',
    });
  }

  getStatus(userId: string) {
    return this.accessRequestModel
      .findOne({ userId: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .exec();
  }

  findPending() {
    return this.accessRequestModel
      .find({ status: 'pending' })
      .populate('userId', 'name email provider isApproved telegramChatId')
      .sort({ createdAt: -1 })
      .exec();
  }

  async updateStatus(id: string, status: AccessRequestStatus) {
    return this.accessRequestModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
  }
}
