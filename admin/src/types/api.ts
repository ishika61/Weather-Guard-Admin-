export type UserRole = 'user' | 'admin'
export type RequestStatus = 'pending' | 'approved' | 'rejected'

export interface AuthUser {
  id: string
  userId?: string
  name?: string
  email: string
  provider?: string
  role: UserRole
  isApproved?: boolean
}

export interface AuthResponse {
  accessToken: string
  user: AuthUser
}

export interface User {
  _id: string
  name: string
  email: string
  provider: string
  role: UserRole
  isApproved: boolean
  telegramChatId?: string
  createdAt?: string
  updatedAt?: string
}

export interface AccessRequest {
  _id: string
  userId: User | string
  status: RequestStatus
  createdAt: string
}
