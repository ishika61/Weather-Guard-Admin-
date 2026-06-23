import type { AccessRequest, User } from '../types/api'

interface PendingRequestsTableProps {
  requests: AccessRequest[]
  loading: boolean
  onApprove: (id: string) => void
  onReject: (id: string) => void
}

export function PendingRequestsTable({
  requests,
  loading,
  onApprove,
  onReject,
}: PendingRequestsTableProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-4 py-3">
        <h2 className="text-lg font-semibold text-slate-950">
          Pending access requests
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Provider</th>
              <th className="px-4 py-3">Requested</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {requests.map((request) => {
              const user = request.userId as User

              return (
                <tr key={request._id}>
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-950">{user.name}</div>
                    <div className="text-slate-500">{user.email}</div>
                  </td>
                  <td className="px-4 py-3 capitalize text-slate-700">
                    {user.provider}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {new Date(request.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => onApprove(request._id)}
                        className="rounded-md bg-teal-700 px-3 py-2 font-medium text-white hover:bg-teal-800 disabled:opacity-60"
                        disabled={loading}
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => onReject(request._id)}
                        className="rounded-md border border-red-200 px-3 py-2 font-medium text-red-700 hover:bg-red-50 disabled:opacity-60"
                        disabled={loading}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
            {!requests.length && (
              <tr>
                <td className="px-4 py-8 text-center text-slate-500" colSpan={4}>
                  No pending requests.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
