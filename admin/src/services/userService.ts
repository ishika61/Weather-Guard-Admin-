import type { User } from '../types/api'
import { api } from './api'

export const userService = {
  async updateTelegramChatId(telegramChatId: string) {
    const { data } = await api.patch<User>('/users/telegram-chat-id', {
      telegramChatId,
    })
    return data
  },
}
