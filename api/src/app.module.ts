import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RequestsModule } from './modules/requests/requests.module';
import { AdminModule } from './modules/admin/admin.module';
import { TelegramModule } from './modules/telegram/telegram.module';
import { WeatherModule } from './modules/weather/weather.module';
import { SchedulerModule } from './modules/scheduler/scheduler.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRoot(process.env.MONGODB_URI!),

    AuthModule,
    UsersModule,
    RequestsModule,
    AdminModule,
    TelegramModule,
    WeatherModule,
    SchedulerModule,
  ],
})
export class AppModule {}
