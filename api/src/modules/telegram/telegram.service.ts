import { Injectable } from '@nestjs/common';

@Injectable()
export class TelegramService {
  async sendApprovalNotification(user: {
    name: string;
    telegramChatId?: string;
  }) {
    return this.sendMessage(
      user.telegramChatId,
      `Hi ${user.name}, your WeatherGuard access request has been approved.`,
    );
  }

  async sendWeatherAlert(
    user: { telegramChatId?: string },
    message: string,
  ) {
    return this.sendMessage(user.telegramChatId, message);
  }

  private async sendMessage(chatId: string | undefined, text: string) {
    const token = process.env.TELEGRAM_BOT_TOKEN;

    if (!token || !chatId) {
      return { skipped: true };
    }

    let response: Response;

    try {
      response = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text }),
          signal: AbortSignal.timeout(10000),
        },
      );
    } catch {
      return { skipped: false, ok: false };
    }

    if (!response.ok) {
      return { skipped: false, ok: false, status: response.status };
    }

    return response.json();
  }
}
