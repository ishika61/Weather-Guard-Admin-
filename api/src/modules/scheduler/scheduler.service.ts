import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import cron, { ScheduledTask } from 'node-cron';
import { WeatherService } from '../weather/weather.service';

@Injectable()
export class SchedulerService implements OnModuleInit, OnModuleDestroy {
  private task?: ScheduledTask;

  constructor(private readonly weatherService: WeatherService) {}

  onModuleInit() {
    this.task = cron.schedule('* * * * *', async () => {
      await this.weatherService.sendSimulatedAlerts();
    });
  }

  onModuleDestroy() {
    this.task?.stop();
  }
}
