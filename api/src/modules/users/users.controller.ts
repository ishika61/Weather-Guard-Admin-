import { Body, Controller, Patch, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Patch('telegram-chat-id')
  updateTelegramChatId(
    @Req() req: { user: { userId: string } },
    @Body('telegramChatId') telegramChatId: string,
  ) {
    return this.usersService.updateTelegramChatId(
      req.user.userId,
      telegramChatId,
    );
  }
}
