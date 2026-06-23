import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { TelegramService } from '../telegram/telegram.service';
import { UsersService } from '../users/users.service';
import { WeatherAlert, WeatherAlertDocument } from './schemas/weather-alert.schema';

@Injectable()
export class WeatherService {
  private readonly alertMessages = [
    'WeatherGuard alert: heavy rain expected in your area.',
    'WeatherGuard alert: strong winds are possible this hour.',
    'WeatherGuard alert: lightning risk detected nearby.',
    'WeatherGuard alert: heat index is rising. Stay hydrated.',
  ];

  constructor(
    private readonly usersService: UsersService,
    private readonly telegramService: TelegramService,
    @InjectModel(WeatherAlert.name)
    private readonly weatherAlertModel: Model<WeatherAlertDocument>,
  ) {}

  async sendSimulatedAlerts() {
    const approvedUsers = await this.usersService.findApprovedUsers();
    const message = this.createSimulatedAlert();

    for (const user of approvedUsers) {
      const result = await this.telegramService.sendWeatherAlert(user, message);

      if (result?.skipped || result?.ok === false) {
        continue;
      }

      await this.weatherAlertModel.create({
        userId: new Types.ObjectId(String(user._id)),
        message,
        sentAt: new Date(),
      });
    }

    return { sent: approvedUsers.length, message };
  }

  private createSimulatedAlert() {
    const index = Math.floor(Math.random() * this.alertMessages.length);

    return this.alertMessages[index];
  }
}
