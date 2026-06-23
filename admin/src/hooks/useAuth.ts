import { useEffect, useState } from 'react'
import {
  clearAuth,
  getStoredUser,
  getToken,
  subscribeToAuthChanges,
} from '../utils/authStorage'

function readAuthState() {
  const token = getToken()
  const user = getStoredUser()

  return {
    token,
    user,
    isAuthenticated: Boolean(token),
    isAdmin: user?.role === 'admin',
  }
}

export function useAuth() {
  const [authState, setAuthState] = useState(readAuthState)

  useEffect(() => {
    return subscribeToAuthChanges(() => setAuthState(readAuthState()))
  }, [])

  return {
    ...authState,
    logout: clearAuth,
  }
}
