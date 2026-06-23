// import { useEffect, useState } from 'react'
// import { ApprovedUsersTable } from '../components/ApprovedUsersTable'
// import { PendingRequestsTable } from '../components/PendingRequestsTable'
// import { adminService } from '../services/adminService'
// import type { AccessRequest, User } from '../types/api'

// export function AdminDashboardPage() {
//   const [pendingRequests, setPendingRequests] = useState<AccessRequest[]>([])
//   const [users, setUsers] = useState<User[]>([])
//   const [loading, setLoading] = useState(true)
//   const [message, setMessage] = useState('')

//   async function loadAdminData() {
//     setLoading(true)
//     try {
//       const [requestsResponse, usersResponse] = await Promise.all([
//         adminService.getPendingUsers(),
//         adminService.getUsers(),
//       ])

//       setPendingRequests(requestsResponse)
//       setUsers(usersResponse)
//     } catch {
//       setMessage('Could not load admin data.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     let isMounted = true

//     Promise.all([adminService.getPendingUsers(), adminService.getUsers()])
//       .then(([requestsResponse, usersResponse]) => {
//         if (isMounted) {
//           setPendingRequests(requestsResponse)
//           setUsers(usersResponse)
//         }
//       })
//       .catch(() => {
//         if (isMounted) {
//           setMessage('Could not load admin data.')
//         }
//       })
//       .finally(() => {
//         if (isMounted) {
//           setLoading(false)
//         }
//       })

//     return () => {
//       isMounted = false
//     }
//   }, [])

//   async function handleApprove(id: string) {
//     setLoading(true)
//     setMessage('')

//     try {
//       await adminService.approveRequest(id)
//       setMessage('User approved.')
//       await loadAdminData()
//     } catch {
//       setMessage('Could not approve user.')
//       setLoading(false)
//     }
//   }

//   async function handleReject(id: string) {
//     setLoading(true)
//     setMessage('')

//     try {
//       await adminService.rejectRequest(id)
//       setMessage('Request rejected.')
//       await loadAdminData()
//     } catch {
//       setMessage('Could not reject request.')
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="grid gap-6">
//       <section className="rounded-lg border border-slate-200 bg-white p-6">
//         <p className="text-sm font-semibold uppercase text-teal-700">
//           Admin dashboard
//         </p>
//         <h1 className="mt-2 text-2xl font-bold text-slate-950">
//           Review access requests
//         </h1>
//         <p className="mt-2 text-sm text-slate-600">
//           Approve only trusted users. Approved users become eligible for
//           Telegram weather alerts.
//         </p>
//       </section>

//       {message && (
//         <div className="rounded-md border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-900">
//           {message}
//         </div>
//       )}

//       <PendingRequestsTable
//         requests={pendingRequests}
//         loading={loading}
//         onApprove={handleApprove}
//         onReject={handleReject}
//       />
//       <ApprovedUsersTable users={users} />
//     </div>
//   )
// }










import { useEffect, useState } from 'react'
import { ApprovedUsersTable } from '../components/ApprovedUsersTable'
import { PendingRequestsTable } from '../components/PendingRequestsTable'
import { adminService } from '../services/adminService'
import type { AccessRequest, User } from '../types/api'

export function AdminDashboardPage() {
  const [pendingRequests, setPendingRequests] = useState<AccessRequest[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  async function loadAdminData() {
    setLoading(true)
    try {
      const [requestsResponse, usersResponse] = await Promise.all([
        adminService.getPendingUsers(),
        adminService.getUsers(),
      ])

      setPendingRequests(requestsResponse)
      setUsers(usersResponse)
    } catch {
      setMessage('Could not load admin data.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let isMounted = true

    Promise.all([adminService.getPendingUsers(), adminService.getUsers()])
      .then(([requestsResponse, usersResponse]) => {
        if (isMounted) {
          setPendingRequests(requestsResponse)
          setUsers(usersResponse)
        }
      })
      .catch(() => {
        if (isMounted) {
          setMessage('Could not load admin data.')
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  async function handleApprove(id: string) {
    setLoading(true)
    setMessage('')

    try {
      await adminService.approveRequest(id)
      setMessage('User approved successfully.')
      await loadAdminData()
    } catch {
      setMessage('Could not approve user.')
      setLoading(false)
    }
  }

  async function handleReject(id: string) {
    setLoading(true)
    setMessage('')

    try {
      await adminService.rejectRequest(id)
      setMessage('Request rejected.')
      await loadAdminData()
    } catch {
      setMessage('Could not reject request.')
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      {/* Header */}
      <section
        className="rounded-2xl p-7"
        style={{
          background: 'rgba(13, 20, 36, 0.8)',
          border: '1px solid rgba(99, 102, 241, 0.15)',
        }}
      >
        <div
          className="mb-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest"
          style={{
            background: 'rgba(99,102,241,0.12)',
            color: '#a5b4fc',
            border: '1px solid rgba(99,102,241,0.2)',
          }}
        >
          Admin dashboard
        </div>
        <h1
          className="text-2xl font-bold"
          style={{ color: '#f1f5f9', letterSpacing: '-0.02em' }}
        >
          Review access requests
        </h1>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: '#64748b' }}>
          Approve only trusted users. Approved users become eligible for Telegram weather alerts.
        </p>
      </section>

      {message && (
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

      <PendingRequestsTable
        requests={pendingRequests}
        loading={loading}
        onApprove={handleApprove}
        onReject={handleReject}
      />
      <ApprovedUsersTable users={users} />
    </div>
  )
}


