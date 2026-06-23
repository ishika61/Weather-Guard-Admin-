import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import type { AuthResponse } from '../types/api'
import { saveAuth, saveToken } from '../utils/authStorage'

export function AuthCallbackPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const token = searchParams.get('accessToken') ?? searchParams.get('token')
    const auth = searchParams.get('auth')

    if (token) {
      if (saveToken(token)) {
        navigate('/dashboard', { replace: true })
      } else {
        navigate('/login', { replace: true })
      }
      return
    }

    if (auth) {
      try {
        saveAuth(JSON.parse(atob(auth)) as AuthResponse)
        navigate('/dashboard', { replace: true })
      } catch {
        navigate('/login', { replace: true })
      }
      return
    }

    navigate('/login', { replace: true })
  }, [navigate, searchParams])

  return (
    <div className="py-16 text-center text-sm text-slate-600">
      Completing sign in...
    </div>
  )
}
