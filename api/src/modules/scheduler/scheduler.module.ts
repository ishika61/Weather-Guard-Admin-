import { Module } from '@nestjs/common';
import { WeatherModule } from '../weather/weather.module';
import { SchedulerService } from './scheduler.service';

@Module({
  imports: [WeatherModule],
  providers: [SchedulerService],
})
export class SchedulerModule {}
