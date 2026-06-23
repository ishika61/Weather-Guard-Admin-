// import { useEffect } from 'react'
// import { useNavigate, useSearchParams } from 'react-router-dom'
// import type { AuthResponse } from '../types/api'
// import { saveAuth, saveToken } from '../utils/authStorage'

// export function AuthCallbackPage() {
//   const [searchParams] = useSearchParams()
//   const navigate = useNavigate()

//   useEffect(() => {
//     const token = searchParams.get('accessToken') ?? searchParams.get('token')
//     const auth = searchParams.get('auth')

//     if (token) {
//       if (saveToken(token)) {
//         navigate('/dashboard', { replace: true })
//       } else {
//         navigate('/login', { replace: true })
//       }
//       return
//     }

//     if (auth) {
//       try {
//         saveAuth(JSON.parse(atob(auth)) as AuthResponse)
//         navigate('/dashboard', { replace: true })
//       } catch {
//         navigate('/login', { replace: true })
//       }
//       return
//     }

//     navigate('/login', { replace: true })
//   }, [navigate, searchParams])

//   return (
//     <div className="py-16 text-center text-sm text-slate-600">
//       Completing sign in...
//     </div>
//   )
// }










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

    if (auth) {
      try {
        saveAuth(JSON.parse(decodeBase64(auth)) as AuthResponse)
        navigate('/dashboard', { replace: true })
      } catch {
        navigate('/login', { replace: true })
      }
      return
    }

    if (token) {
      if (saveToken(token)) {
        navigate('/dashboard', { replace: true })
      } else {
        navigate('/login', { replace: true })
      }
      return
    }

    navigate('/login', { replace: true })
  }, [navigate, searchParams])

  return (
    <div className="flex min-h-[calc(100vh-96px)] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-10 w-10 animate-spin rounded-full"
          style={{
            border: '2px solid rgba(99,102,241,0.15)',
            borderTopColor: '#6366f1',
          }}
        />
        <p className="text-sm" style={{ color: '#475569' }}>
          Completing sign in…
        </p>
      </div>
    </div>
  )
}

function decodeBase64(value: string) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=')

  return atob(padded)
}
