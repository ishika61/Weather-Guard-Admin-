// import type { User } from '../types/api'

// interface ApprovedUsersTableProps {
//   users: User[]
// }

// export function ApprovedUsersTable({ users }: ApprovedUsersTableProps) {
//   const approvedUsers = users.filter((user) => user.isApproved)

//   return (
//     <section className="rounded-lg border border-slate-200 bg-white">
//       <div className="border-b border-slate-200 px-4 py-3">
//         <h2 className="text-lg font-semibold text-slate-950">Approved users</h2>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
//           <thead className="bg-slate-50 text-xs uppercase text-slate-500">
//             <tr>
//               <th className="px-4 py-3">Name</th>
//               <th className="px-4 py-3">Email</th>
//               <th className="px-4 py-3">Provider</th>
//               <th className="px-4 py-3">Telegram</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-slate-100">
//             {approvedUsers.map((user) => (
//               <tr key={user._id}>
//                 <td className="px-4 py-3 font-medium text-slate-950">
//                   {user.name}
//                 </td>
//                 <td className="px-4 py-3 text-slate-600">{user.email}</td>
//                 <td className="px-4 py-3 capitalize text-slate-600">
//                   {user.provider}
//                 </td>
//                 <td className="px-4 py-3 text-slate-600">
//                   {user.telegramChatId ? 'Connected' : 'Not connected'}
//                 </td>
//               </tr>
//             ))}
//             {!approvedUsers.length && (
//               <tr>
//                 <td className="px-4 py-8 text-center text-slate-500" colSpan={4}>
//                   No approved users yet.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </section>
//   )
// }






import type { User } from '../types/api'

interface ApprovedUsersTableProps {
  users: User[]
}

export function ApprovedUsersTable({ users }: ApprovedUsersTableProps) {
  const approvedUsers = users.filter((user) => user.isApproved)

  return (
    <section
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(13, 20, 36, 0.8)',
        border: '1px solid rgba(99, 102, 241, 0.15)',
      }}
    >
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: '1px solid rgba(99,102,241,0.1)' }}
      >
        <div>
          <h2 className="text-base font-semibold" style={{ color: '#f1f5f9' }}>
            Approved users
          </h2>
          <p className="mt-0.5 text-xs" style={{ color: '#475569' }}>
            {approvedUsers.length} active {approvedUsers.length === 1 ? 'user' : 'users'}
          </p>
        </div>
        {approvedUsers.length > 0 && (
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-bold"
            style={{
              background: 'rgba(52,211,153,0.1)',
              color: '#34d399',
              border: '1px solid rgba(52,211,153,0.25)',
            }}
          >
            {approvedUsers.length}
          </span>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(99,102,241,0.08)' }}>
              {['Name', 'Email', 'Provider', 'Telegram'].map((th) => (
                <th
                  key={th}
                  className="px-6 py-3 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: '#475569' }}
                >
                  {th}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {approvedUsers.map((user, i) => (
              <tr
                key={user._id}
                style={{
                  borderBottom:
                    i < approvedUsers.length - 1
                      ? '1px solid rgba(99,102,241,0.06)'
                      : 'none',
                }}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold uppercase"
                      style={{
                        background: 'rgba(52,211,153,0.12)',
                        color: '#34d399',
                        border: '1px solid rgba(52,211,153,0.25)',
                      }}
                    >
                      {(user.name ?? user.email ?? '?')[0]}
                    </div>
                    <span className="font-medium" style={{ color: '#e2e8f0' }}>
                      {user.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs" style={{ color: '#64748b' }}>
                  {user.email}
                </td>
                <td className="px-6 py-4">
                  <span
                    className="rounded-full px-2.5 py-0.5 text-xs font-medium capitalize"
                    style={{
                      background: 'rgba(148,163,184,0.08)',
                      color: '#94a3b8',
                      border: '1px solid rgba(148,163,184,0.15)',
                    }}
                  >
                    {user.provider}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {user.telegramChatId ? (
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium"
                      style={{
                        background: 'rgba(56,189,248,0.1)',
                        color: '#7dd3fc',
                        border: '1px solid rgba(56,189,248,0.2)',
                      }}
                    >
                      <span
                        className="inline-block h-1.5 w-1.5 rounded-full"
                        style={{ background: '#38bdf8' }}
                      />
                      Connected
                    </span>
                  ) : (
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium"
                      style={{
                        background: 'rgba(148,163,184,0.06)',
                        color: '#475569',
                        border: '1px solid rgba(148,163,184,0.12)',
                      }}
                    >
                      Not connected
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {!approvedUsers.length && (
              <tr>
                <td className="px-6 py-12 text-center" colSpan={4}>
                  <div
                    className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </div>
                  <p className="text-sm" style={{ color: '#475569' }}>No approved users yet</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
