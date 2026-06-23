import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { RequestsModule } from '../requests/requests.module';
import { TelegramModule } from '../telegram/telegram.module';
import { UsersModule } from '../users/users.module';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';

@Module({
  imports: [AuthModule, UsersModule, RequestsModule, TelegramModule],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
