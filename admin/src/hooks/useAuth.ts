import { useMemo } from 'react'
import { clearAuth, getStoredUser, getToken } from '../utils/authStorage'

export function useAuth() {
  return useMemo(() => {
    const token = getToken()
    const user = getStoredUser()

    return {
      token,
      user,
      isAuthenticated: Boolean(token),
      isAdmin: user?.role === 'admin',
      logout: clearAuth,
    }
  }, [])
}
