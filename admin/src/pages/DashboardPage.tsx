// import { useEffect, useState } from 'react'
// import type { FormEvent } from 'react'
// import { useAuth } from '../hooks/useAuth'
// import { requestService } from '../services/requestService'
// import { userService } from '../services/userService'
// import type { AccessRequest } from '../types/api'

// export function DashboardPage() {
//   const { user } = useAuth()
//   const [status, setStatus] = useState<AccessRequest | null>(null)
//   const [telegramChatId, setTelegramChatId] = useState('')
//   const [message, setMessage] = useState('')
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     let isMounted = true

//     requestService
//       .getStatus()
//       .then((request) => {
//         if (isMounted) {
//           setStatus(request)
//         }
//       })
//       .catch(() => {
//         if (isMounted) {
//           setMessage('Could not load access status.')
//         }
//       })

//     return () => {
//       isMounted = false
//     }
//   }, [])

//   async function handleRequestAccess() {
//     setLoading(true)
//     setMessage('')

//     try {
//       const request = await requestService.requestAccess()
//       setStatus(request)
//       setMessage('Access request submitted.')
//     } catch {
//       setMessage('Could not submit access request.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   async function handleTelegramSubmit(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault()

//     if (!telegramChatId.trim()) {
//       return
//     }

//     setLoading(true)
//     setMessage('')

//     try {
//       await userService.updateTelegramChatId(telegramChatId.trim())
//       setMessage('Telegram chat ID saved.')
//       setTelegramChatId('')
//     } catch {
//       setMessage('Could not save Telegram chat ID.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const statusLabel = status?.status ?? 'not requested'

//   return (
//     <div className="grid gap-6">
//       <section className="rounded-lg border border-slate-200 bg-white p-6">
//         <p className="text-sm font-semibold uppercase text-teal-700">
//           User dashboard
//         </p>
//         <h1 className="mt-2 text-2xl font-bold text-slate-950">
//           Welcome {user?.name ?? user?.email}
//         </h1>
//         <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
//           <div>
//             <span className="block text-slate-500">Email</span>
//             {user?.email}
//           </div>
//           <div>
//             <span className="block text-slate-500">Role</span>
//             {user?.role}
//           </div>
//           <div>
//             <span className="block text-slate-500">Approval status</span>
//             <span className="capitalize">{statusLabel}</span>
//           </div>
//         </div>
//       </section>

//       <section className="grid gap-6 md:grid-cols-2">
//         <div className="rounded-lg border border-slate-200 bg-white p-6">
//           <h2 className="text-lg font-semibold text-slate-950">
//             Request access
//           </h2>
//           <p className="mt-2 text-sm text-slate-600">
//             Submit a request so an admin can review and approve your account.
//           </p>
//           <button
//             type="button"
//             onClick={handleRequestAccess}
//             disabled={loading || status?.status === 'pending'}
//             className="mt-4 rounded-md bg-teal-700 px-4 py-2 font-medium text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
//           >
//             Request Access
//           </button>
//         </div>

//         <form
//           onSubmit={handleTelegramSubmit}
//           className="rounded-lg border border-slate-200 bg-white p-6"
//         >
//           <h2 className="text-lg font-semibold text-slate-950">
//             Connect Telegram
//           </h2>
//           <p className="mt-2 text-sm text-slate-600">
//             Add your Telegram chat ID to receive approval and weather alerts.
//           </p>
//           <input
//             value={telegramChatId}
//             onChange={(event) => setTelegramChatId(event.target.value)}
//             placeholder="Telegram chat ID"
//             className="mt-4 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="mt-3 rounded-md bg-slate-950 px-4 py-2 font-medium text-white hover:bg-slate-800 disabled:opacity-60"
//           >
//             Save Chat ID
//           </button>
//         </form>
//       </section>

//       {message && (
//         <div className="rounded-md border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-900">
//           {message}
//         </div>
//       )}
//     </div>
//   )
// }












import { useEffect, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { requestService } from '../services/requestService'
import { userService } from '../services/userService'
import type { AccessRequest } from '../types/api'

const cardStyle = {
  background: 'rgba(13, 20, 36, 0.8)',
  border: '1px solid rgba(99, 102, 241, 0.15)',
  borderRadius: 16,
}

type SummaryItem = {
  label: string
  value: ReactNode
}

export function DashboardPage() {
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'
  const [status, setStatus] = useState<AccessRequest | null>(null)
  const [telegramChatId, setTelegramChatId] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAdmin) {
      return
    }

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
  }, [isAdmin])

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

  const statusLabel = isAdmin ? null : status?.status ?? 'not requested'

  const statusColor =
    statusLabel === 'approved'
      ? { color: '#34d399', bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.25)' }
      : statusLabel === 'pending'
      ? { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.25)' }
      : statusLabel === 'rejected'
      ? { color: '#f87171', bg: 'rgba(248,113,113,0.1)', border: 'rgba(248,113,113,0.25)' }
      : { color: '#94a3b8', bg: 'rgba(148,163,184,0.1)', border: 'rgba(148,163,184,0.2)' }

  const summaryItems: SummaryItem[] = [
    { label: 'Email', value: user?.email },
    { label: 'Role', value: user?.role },
  ]

  if (!isAdmin) {
    summaryItems.push({
      label: 'Approval status',
      value: (
        <span
          className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize"
          style={{
            color: statusColor.color,
            background: statusColor.bg,
            border: `1px solid ${statusColor.border}`,
          }}
        >
          {statusLabel}
        </span>
      ),
    })
  }

  return (
    <div className="grid gap-6">
      {/* Header card */}
      <section className="rounded-2xl p-7" style={cardStyle}>
        <div
          className="mb-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest"
          style={{
            background: 'rgba(99,102,241,0.12)',
            color: '#a5b4fc',
            border: '1px solid rgba(99,102,241,0.2)',
          }}
        >
          {isAdmin ? 'Admin dashboard' : 'User dashboard'}
        </div>
        <h1
          className="text-2xl font-bold"
          style={{ color: '#f1f5f9', letterSpacing: '-0.02em' }}
        >
          Welcome back, {user?.name ?? user?.email}
        </h1>
        <div className={`mt-5 grid gap-4 text-sm ${isAdmin ? 'sm:grid-cols-2' : 'sm:grid-cols-3'}`}>
          {summaryItems.map(({ label, value }) => (
            <div
              key={label}
              className="rounded-xl p-4"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <span className="block text-xs font-medium uppercase tracking-wider" style={{ color: '#475569' }}>
                {label}
              </span>
              <span className="mt-1.5 block font-medium" style={{ color: '#cbd5e1' }}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {isAdmin ? (
        <section className="rounded-2xl p-7" style={cardStyle}>
          <div
            className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl"
            style={{
              background: 'rgba(99,102,241,0.15)',
              border: '1px solid rgba(99,102,241,0.25)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l7 4v5c0 4.5-2.9 7.8-7 9-4.1-1.2-7-4.5-7-9V7l7-4z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold" style={{ color: '#f1f5f9' }}>
            Admin control center
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed" style={{ color: '#64748b' }}>
            Your account has administrator privileges. Use the admin area to review user requests and manage approved weather-alert access.
          </p>
          <Link
            to="/admin"
            className="mt-5 inline-flex rounded-xl px-5 py-2.5 text-sm font-semibold transition-all"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
              color: '#fff',
              border: '1px solid rgba(99,102,241,0.5)',
              boxShadow: '0 0 16px rgba(99,102,241,0.3)',
            }}
          >
            Open Admin Dashboard
          </Link>
        </section>
      ) : (
      <section className="grid gap-5 md:grid-cols-2">
        {/* Request Access */}
        <div className="rounded-2xl p-6" style={cardStyle}>
          <div
            className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <h2 className="text-base font-semibold" style={{ color: '#f1f5f9' }}>
            Request access
          </h2>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: '#64748b' }}>
            Submit a request so an admin can review and approve your account for weather alerts.
          </p>
          <button
            type="button"
            onClick={handleRequestAccess}
            disabled={loading || status?.status === 'pending'}
            className="mt-5 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
              color: '#fff',
              border: '1px solid rgba(99,102,241,0.5)',
              boxShadow: '0 0 16px rgba(99,102,241,0.3)',
            }}
            onMouseEnter={e => {
              if (!(e.currentTarget as HTMLButtonElement).disabled) {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px rgba(99,102,241,0.5)'
              }
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 16px rgba(99,102,241,0.3)'
            }}
          >
            Request Access
          </button>
        </div>

        {/* Connect Telegram */}
        <form
          onSubmit={handleTelegramSubmit}
          className="rounded-2xl p-6"
          style={cardStyle}
        >
          <div
            className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </div>
          <h2 className="text-base font-semibold" style={{ color: '#f1f5f9' }}>
            Connect Telegram
          </h2>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: '#64748b' }}>
            Add your Telegram chat ID to receive approval notifications and weather alerts.
          </p>
          <input
            value={telegramChatId}
            onChange={(event) => setTelegramChatId(event.target.value)}
            placeholder="Enter Telegram chat ID"
            className="mt-5 w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(99,102,241,0.2)',
              color: '#e2e8f0',
            }}
            onFocus={e => {
              (e.target as HTMLElement).style.borderColor = 'rgba(99,102,241,0.6)'
              ;(e.target as HTMLElement).style.boxShadow = '0 0 0 3px rgba(99,102,241,0.12)'
            }}
            onBlur={e => {
              (e.target as HTMLElement).style.borderColor = 'rgba(99,102,241,0.2)'
              ;(e.target as HTMLElement).style.boxShadow = 'none'
            }}
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-3 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all disabled:opacity-40"
            style={{
              background: 'rgba(56,189,248,0.1)',
              border: '1px solid rgba(56,189,248,0.25)',
              color: '#7dd3fc',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(56,189,248,0.18)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(56,189,248,0.1)'
            }}
          >
            Save Chat ID
          </button>
        </form>
      </section>
      )}

      {!isAdmin && message && (
        <div
          className="rounded-xl px-5 py-3.5 text-sm font-medium"
          style={{
            background: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.25)',
            color: '#a5b4fc',
          }}
        >
          {message}
        </div>
      )}
    </div>
  )
}
