import type { AccessRequest, User } from '../types/api'
import { api } from './api'

export const adminService = {
  async getPendingUsers() {
    const { data } = await api.get<AccessRequest[]>('/admin/pending-users')
    return data
  },

  async getUsers() {
    const { data } = await api.get<User[]>('/admin/users')
    return data
  },

  async approveRequest(id: string) {
    const { data } = await api.patch(`/admin/approve/${id}`)
    return data
  },

  async rejectRequest(id: string) {
    const { data } = await api.patch(`/admin/reject/${id}`)
    return data
  },
}
