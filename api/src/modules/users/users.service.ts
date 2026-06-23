import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  findAll() {
    return this.userModel.find().sort({ createdAt: -1 }).exec();
  }

  findApprovedUsers() {
    return this.userModel
      .find({
        isApproved: true,
        telegramChatId: { $exists: true, $nin: [null, ''] },
      })
      .exec();
  }

  findById(id: string) {
    return this.userModel.findById(id).exec();
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findOrCreateOAuthUser(payload: {
    name: string;
    email: string;
    provider: string;
  }) {
    const adminEmails = (process.env.ADMIN_EMAILS ?? '')
      .split(',')
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean);
    const role = adminEmails.includes(payload.email.toLowerCase())
      ? 'admin'
      : 'user';
    const existingUser = await this.findByEmail(payload.email);

    if (existingUser) {
      existingUser.name = payload.name;
      existingUser.provider = payload.provider;

      if (existingUser.role !== role) {
        existingUser.role = role;
      }

      await existingUser.save();

      return existingUser;
    }

    return this.userModel.create({
      ...payload,
      role,
    });
  }

  async setApproval(userId: string, isApproved: boolean) {
    const user = await this.userModel
      .findByIdAndUpdate(userId, { isApproved }, { new: true })
      .exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateTelegramChatId(userId: string, telegramChatId: string) {
    const user = await this.userModel
      .findByIdAndUpdate(userId, { telegramChatId }, { new: true })
      .exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
