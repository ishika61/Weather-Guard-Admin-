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
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <Link to="/" className="text-xl font-semibold text-slate-950">
          WeatherGuard
        </Link>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          {isAuthenticated ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? 'font-medium text-teal-700' : 'text-slate-600'
                }
              >
                Dashboard
              </NavLink>
              {isAdmin && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    isActive ? 'font-medium text-teal-700' : 'text-slate-600'
                  }
                >
                  Admin
                </NavLink>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md border border-slate-300 px-3 py-2 text-slate-700 hover:bg-slate-100"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className="font-medium text-teal-700">
              Login
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  )
}
