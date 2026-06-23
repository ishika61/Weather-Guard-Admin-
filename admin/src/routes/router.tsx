import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { AppLayout } from '../layouts/AppLayout'
import { AdminDashboardPage } from '../pages/AdminDashboardPage'
import { AuthCallbackPage } from '../pages/AuthCallbackPage'
import { DashboardPage } from '../pages/DashboardPage'
import { LoginPage } from '../pages/LoginPage'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/auth/callback',
        element: <AuthCallbackPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/dashboard',
            element: <DashboardPage />,
          },
        ],
      },
      {
        element: <ProtectedRoute adminOnly />,
        children: [
          {
            path: '/admin',
            element: <AdminDashboardPage />,
          },
        ],
      },
    ],
  },
])
