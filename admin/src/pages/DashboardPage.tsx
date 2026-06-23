import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useAuth } from '../hooks/useAuth'
import { requestService } from '../services/requestService'
import { userService } from '../services/userService'
import type { AccessRequest } from '../types/api'

export function DashboardPage() {
  const { user } = useAuth()
  const [status, setStatus] = useState<AccessRequest | null>(null)
  const [telegramChatId, setTelegramChatId] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let isMounted = true

    requestService
      .getStatus()
      .then((request) => {
        if (isMounted) {
          setStatus(request)
        }
      })
      .catch(() => {
        if (isMounted) {
          setMessage('Could not load access status.')
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  async function handleRequestAccess() {
    setLoading(true)
    setMessage('')

    try {
      const request = await requestService.requestAccess()
      setStatus(request)
      setMessage('Access request submitted.')
    } catch {
      setMessage('Could not submit access request.')
    } finally {
      setLoading(false)
    }
  }

  async function handleTelegramSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!telegramChatId.trim()) {
      return
    }

    setLoading(true)
    setMessage('')

    try {
      await userService.updateTelegramChatId(telegramChatId.trim())
      setMessage('Telegram chat ID saved.')
      setTelegramChatId('')
    } catch {
      setMessage('Could not save Telegram chat ID.')
    } finally {
      setLoading(false)
    }
  }

  const statusLabel = status?.status ?? 'not requested'

  return (
    <div className="grid gap-6">
      <section className="rounded-lg border border-slate-200 bg-white p-6">
        <p className="text-sm font-semibold uppercase text-teal-700">
          User dashboard
        </p>
        <h1 className="mt-2 text-2xl font-bold text-slate-950">
          Welcome {user?.name ?? user?.email}
        </h1>
        <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
          <div>
            <span className="block text-slate-500">Email</span>
            {user?.email}
          </div>
          <div>
            <span className="block text-slate-500">Role</span>
            {user?.role}
          </div>
          <div>
            <span className="block text-slate-500">Approval status</span>
            <span className="capitalize">{statusLabel}</span>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-950">
            Request access
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Submit a request so an admin can review and approve your account.
          </p>
          <button
            type="button"
            onClick={handleRequestAccess}
            disabled={loading || status?.status === 'pending'}
            className="mt-4 rounded-md bg-teal-700 px-4 py-2 font-medium text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Request Access
          </button>
        </div>

        <form
          onSubmit={handleTelegramSubmit}
          className="rounded-lg border border-slate-200 bg-white p-6"
        >
          <h2 className="text-lg font-semibold text-slate-950">
            Connect Telegram
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Add your Telegram chat ID to receive approval and weather alerts.
          </p>
          <input
            value={telegramChatId}
            onChange={(event) => setTelegramChatId(event.target.value)}
            placeholder="Telegram chat ID"
            className="mt-4 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-3 rounded-md bg-slate-950 px-4 py-2 font-medium text-white hover:bg-slate-800 disabled:opacity-60"
          >
            Save Chat ID
          </button>
        </form>
      </section>

      {message && (
        <div className="rounded-md border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-900">
          {message}
        </div>
      )}
    </div>
  )
}
