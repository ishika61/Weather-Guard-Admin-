import type { AuthResponse, AuthUser } from '../types/api'

const tokenKey = 'weatherguard_token'
const userKey = 'weatherguard_user'

type JwtPayload = {
  sub?: string
  email?: string
  role?: 'user' | 'admin'
}

export function saveAuth(auth: AuthResponse) {
  localStorage.setItem(tokenKey, normalizeToken(auth.accessToken))
  localStorage.setItem(userKey, JSON.stringify(auth.user))
}

export function saveToken(rawToken: string) {
  const auth = parseAuthResponse(rawToken)

  if (auth) {
    saveAuth(auth)
    return true
  }

  const token = normalizeToken(rawToken)
  const payload = parseJwt(token)

  if (!payload?.email) {
    return false
  }

  localStorage.setItem(tokenKey, token)

  const user: AuthUser = {
    id: payload.sub ?? '',
    email: payload.email,
    role: payload.role ?? 'user',
  }

  localStorage.setItem(userKey, JSON.stringify(user))

  return true
}

export function getToken() {
  return localStorage.getItem(tokenKey)
}

export function getStoredUser(): AuthUser | null {
  const rawUser = localStorage.getItem(userKey)

  if (!rawUser) {
    return null
  }

  try {
    return JSON.parse(rawUser) as AuthUser
  } catch {
    clearAuth()
    return null
  }
}

export function clearAuth() {
  localStorage.removeItem(tokenKey)
  localStorage.removeItem(userKey)
}

function parseJwt(token: string): JwtPayload | null {
  try {
    const [, payload] = token.split('.')
    return JSON.parse(decodeBase64Url(payload)) as JwtPayload
  } catch {
    return null
  }
}

function normalizeToken(rawToken: string) {
  let token = rawToken.trim()

  if (
    (token.startsWith('"') && token.endsWith('"')) ||
    (token.startsWith("'") && token.endsWith("'"))
  ) {
    token = token.slice(1, -1)
  }

  return token.replace(/^Bearer\s+/i, '').trim()
}

function parseAuthResponse(rawValue: string): AuthResponse | null {
  try {
    const parsed = JSON.parse(rawValue.trim()) as Partial<AuthResponse>

    if (parsed.accessToken && parsed.user) {
      return parsed as AuthResponse
    }

    return null
  } catch {
    return null
  }
}

function decodeBase64Url(value: string) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=')

  return atob(padded)
}
