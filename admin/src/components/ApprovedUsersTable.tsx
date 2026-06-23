import type { User } from '../types/api'

interface ApprovedUsersTableProps {
  users: User[]
}

export function ApprovedUsersTable({ users }: ApprovedUsersTableProps) {
  const approvedUsers = users.filter((user) => user.isApproved)

  return (
    <section className="rounded-lg border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-4 py-3">
        <h2 className="text-lg font-semibold text-slate-950">Approved users</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Provider</th>
              <th className="px-4 py-3">Telegram</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {approvedUsers.map((user) => (
              <tr key={user._id}>
                <td className="px-4 py-3 font-medium text-slate-950">
                  {user.name}
                </td>
                <td className="px-4 py-3 text-slate-600">{user.email}</td>
                <td className="px-4 py-3 capitalize text-slate-600">
                  {user.provider}
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {user.telegramChatId ? 'Connected' : 'Not connected'}
                </td>
              </tr>
            ))}
            {!approvedUsers.length && (
              <tr>
                <td className="px-4 py-8 text-center text-slate-500" colSpan={4}>
                  No approved users yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
