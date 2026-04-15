// 给 HomePage 加保护，只有登录用户才能访问。未登录用户访问 HomePage 时会被重定向到 LoginPage。
import { Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500 text-lg">Loading...</div>
      </div>
    )
  }

  return user ? children : <Navigate to="/login" replace />
}
