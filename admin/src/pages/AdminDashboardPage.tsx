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
      setMessage('User approved.')
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
      <section className="rounded-lg border border-slate-200 bg-white p-6">
        <p className="text-sm font-semibold uppercase text-teal-700">
          Admin dashboard
        </p>
        <h1 className="mt-2 text-2xl font-bold text-slate-950">
          Review access requests
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Approve only trusted users. Approved users become eligible for
          Telegram weather alerts.
        </p>
      </section>

      {message && (
        <div className="rounded-md border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-900">
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
