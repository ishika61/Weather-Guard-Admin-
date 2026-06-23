import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import { saveToken } from '../utils/authStorage'

export function LoginPage() {
  const [token, setToken] = useState('')
  const navigate = useNavigate()

  function handleTokenSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!token.trim()) {
      return
    }

    if (saveToken(token.trim())) {
      navigate('/dashboard')
    }
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-96px)] max-w-md flex-col justify-center">
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase text-teal-700">
            WeatherGuard Admin
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            Secure weather alerts
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Sign in with a social account to request access or manage users.
          </p>
        </div>

        <div className="grid gap-3">
          <a
            href={authService.googleLoginUrl}
            className="rounded-md border border-slate-300 px-4 py-3 text-center font-medium text-slate-800 hover:bg-slate-50"
          >
            Login with Google
          </a>
          <a
            href={authService.githubLoginUrl}
            className="rounded-md bg-slate-950 px-4 py-3 text-center font-medium text-white hover:bg-slate-800"
          >
            Login with GitHub
          </a>
        </div>

        <form onSubmit={handleTokenSubmit} className="mt-6 border-t pt-6">
          <label
            htmlFor="token"
            className="block text-sm font-medium text-slate-700"
          >
            Access token
          </label>
          <input
            id="token"
            value={token}
            onChange={(event) => setToken(event.target.value)}
            placeholder="Paste JWT after OAuth callback"
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
          />
          <button
            type="submit"
            className="mt-3 w-full rounded-md bg-teal-700 px-4 py-2 font-medium text-white hover:bg-teal-800"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}
