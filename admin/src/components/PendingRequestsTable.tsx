// import type { AccessRequest, User } from '../types/api'

// interface PendingRequestsTableProps {
//   requests: AccessRequest[]
//   loading: boolean
//   onApprove: (id: string) => void
//   onReject: (id: string) => void
// }

// export function PendingRequestsTable({
//   requests,
//   loading,
//   onApprove,
//   onReject,
// }: PendingRequestsTableProps) {
//   return (
//     <section className="rounded-lg border border-slate-200 bg-white">
//       <div className="border-b border-slate-200 px-4 py-3">
//         <h2 className="text-lg font-semibold text-slate-950">
//           Pending access requests
//         </h2>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
//           <thead className="bg-slate-50 text-xs uppercase text-slate-500">
//             <tr>
//               <th className="px-4 py-3">User</th>
//               <th className="px-4 py-3">Provider</th>
//               <th className="px-4 py-3">Requested</th>
//               <th className="px-4 py-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-slate-100">
//             {requests.map((request) => {
//               const user = request.userId as User

//               return (
//                 <tr key={request._id}>
//                   <td className="px-4 py-3">
//                     <div className="font-medium text-slate-950">{user.name}</div>
//                     <div className="text-slate-500">{user.email}</div>
//                   </td>
//                   <td className="px-4 py-3 capitalize text-slate-700">
//                     {user.provider}
//                   </td>
//                   <td className="px-4 py-3 text-slate-600">
//                     {new Date(request.createdAt).toLocaleString()}
//                   </td>
//                   <td className="px-4 py-3">
//                     <div className="flex flex-wrap gap-2">
//                       <button
//                         type="button"
//                         onClick={() => onApprove(request._id)}
//                         className="rounded-md bg-teal-700 px-3 py-2 font-medium text-white hover:bg-teal-800 disabled:opacity-60"
//                         disabled={loading}
//                       >
//                         Approve
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() => onReject(request._id)}
//                         className="rounded-md border border-red-200 px-3 py-2 font-medium text-red-700 hover:bg-red-50 disabled:opacity-60"
//                         disabled={loading}
//                       >
//                         Reject
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               )
//             })}
//             {!requests.length && (
//               <tr>
//                 <td className="px-4 py-8 text-center text-slate-500" colSpan={4}>
//                   No pending requests.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </section>
//   )
// }





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
            Pending access requests
          </h2>
          <p className="mt-0.5 text-xs" style={{ color: '#475569' }}>
            {requests.length} pending {requests.length === 1 ? 'request' : 'requests'}
          </p>
        </div>
        {requests.length > 0 && (
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-bold"
            style={{
              background: 'rgba(251,191,36,0.12)',
              color: '#fbbf24',
              border: '1px solid rgba(251,191,36,0.25)',
            }}
          >
            {requests.length}
          </span>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(99,102,241,0.08)' }}>
              {['User', 'Provider', 'Requested', 'Actions'].map((th) => (
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
            {requests.map((request, i) => {
              const user = request.userId as User

              return (
                <tr
                  key={request._id}
                  style={{
                    borderBottom:
                      i < requests.length - 1
                        ? '1px solid rgba(99,102,241,0.06)'
                        : 'none',
                  }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold uppercase"
                        style={{
                          background: 'rgba(99,102,241,0.2)',
                          color: '#a5b4fc',
                          border: '1px solid rgba(99,102,241,0.3)',
                        }}
                      >
                        {(user.name ?? user.email ?? '?')[0]}
                      </div>
                      <div>
                        <div className="font-medium" style={{ color: '#e2e8f0' }}>
                          {user.name}
                        </div>
                        <div className="text-xs" style={{ color: '#475569' }}>
                          {user.email}
                        </div>
                      </div>
                    </div>
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
                  <td className="px-6 py-4 text-xs" style={{ color: '#64748b' }}>
                    {new Date(request.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => onApprove(request._id)}
                        disabled={loading}
                        className="rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all disabled:opacity-40"
                        style={{
                          background: 'rgba(52,211,153,0.12)',
                          border: '1px solid rgba(52,211,153,0.3)',
                          color: '#34d399',
                        }}
                        onMouseEnter={e => {
                          if (!(e.currentTarget as HTMLButtonElement).disabled)
                            (e.currentTarget as HTMLElement).style.background = 'rgba(52,211,153,0.2)'
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.background = 'rgba(52,211,153,0.12)'
                        }}
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => onReject(request._id)}
                        disabled={loading}
                        className="rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all disabled:opacity-40"
                        style={{
                          background: 'rgba(248,113,113,0.08)',
                          border: '1px solid rgba(248,113,113,0.25)',
                          color: '#f87171',
                        }}
                        onMouseEnter={e => {
                          if (!(e.currentTarget as HTMLButtonElement).disabled)
                            (e.currentTarget as HTMLElement).style.background = 'rgba(248,113,113,0.16)'
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.background = 'rgba(248,113,113,0.08)'
                        }}
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
                <td className="px-6 py-12 text-center" colSpan={4}>
                  <div
                    className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  </div>
                  <p className="text-sm" style={{ color: '#475569' }}>No pending requests</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}


