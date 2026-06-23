// import { Link, NavLink, useNavigate } from 'react-router-dom'
// import { useAuth } from '../hooks/useAuth'

// export function Navbar() {
//   const { isAuthenticated, isAdmin, logout } = useAuth()
//   const navigate = useNavigate()

//   function handleLogout() {
//     logout()
//     navigate('/login')
//   }

//   return (
//     <header className="border-b border-slate-200 bg-white">
//       <nav className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
//         <Link to="/" className="text-xl font-semibold text-slate-950">
//           WeatherGuard
//         </Link>

//         <div className="flex flex-wrap items-center gap-3 text-sm">
//           {isAuthenticated ? (
//             <>
//               <NavLink
//                 to="/dashboard"
//                 className={({ isActive }) =>
//                   isActive ? 'font-medium text-teal-700' : 'text-slate-600'
//                 }
//               >
//                 Dashboard
//               </NavLink>
//               {isAdmin && (
//                 <NavLink
//                   to="/admin"
//                   className={({ isActive }) =>
//                     isActive ? 'font-medium text-teal-700' : 'text-slate-600'
//                   }
//                 >
//                   Admin
//                 </NavLink>
//               )}
//               <button
//                 type="button"
//                 onClick={handleLogout}
//                 className="rounded-md border border-slate-300 px-3 py-2 text-slate-700 hover:bg-slate-100"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <NavLink to="/login" className="font-medium text-teal-700">
//               Login
//             </NavLink>
//           )}
//         </div>
//       </nav>
//     </header>
//   )
// }











import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function Navbar() {
  const { isAuthenticated, isAdmin, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <header
      style={{
        background: 'rgba(8, 12, 20, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(99, 102, 241, 0.15)',
      }}
      className="sticky top-0 z-50"
    >
      <nav className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold"
          style={{ color: '#fff', letterSpacing: '-0.02em' }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 28,
              height: 28,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              fontSize: 13,
              fontWeight: 700,
              color: '#fff',
              flexShrink: 0,
            }}
          >
            W
          </span>
          WeatherGuard
        </Link>

        <div className="flex flex-wrap items-center gap-2 text-sm">
          {isAuthenticated ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? 'rounded-md px-3 py-2 font-medium'
                    : 'rounded-md px-3 py-2 font-medium transition-colors'
                }
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: '#a5b4fc',
                        background: 'rgba(99, 102, 241, 0.15)',
                      }
                    : { color: '#94a3b8' }
                }
              >
                Dashboard
              </NavLink>
              {isAdmin && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    isActive
                      ? 'rounded-md px-3 py-2 font-medium'
                      : 'rounded-md px-3 py-2 font-medium transition-colors'
                  }
                  style={({ isActive }) =>
                    isActive
                      ? {
                          color: '#a5b4fc',
                          background: 'rgba(99, 102, 241, 0.15)',
                        }
                      : { color: '#94a3b8' }
                  }
                >
                  Admin
                </NavLink>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md px-3 py-2 text-sm font-medium transition-colors"
                style={{
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  color: '#94a3b8',
                  background: 'transparent',
                }}
                onMouseEnter={e => {
                  (e.target as HTMLElement).style.background = 'rgba(148, 163, 184, 0.08)'
                }}
                onMouseLeave={e => {
                  (e.target as HTMLElement).style.background = 'transparent'
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="rounded-md px-3 py-2 font-medium"
              style={{ color: '#a5b4fc' }}
            >
              Login
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  )
}