import type { AccessRequest } from '../types/api'
import { api } from './api'

export const requestService = {
  async requestAccess() {
    const { data } = await api.post<AccessRequest>('/requests/access')
    return data
  },

  async getStatus() {
    const { data } = await api.get<AccessRequest | null>('/requests/status')
    return data
  },
}
