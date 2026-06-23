import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TelegramModule } from '../telegram/telegram.module';
import { UsersModule } from '../users/users.module';
import { WeatherAlert, WeatherAlertSchema } from './schemas/weather-alert.schema';
import { WeatherService } from './weather.service';

@Module({
  imports: [
    UsersModule,
    TelegramModule,
    MongooseModule.forFeature([
      { name: WeatherAlert.name, schema: WeatherAlertSchema },
    ]),
  ],
  providers: [WeatherService],
  exports: [WeatherService],
})
export class WeatherModule {}
