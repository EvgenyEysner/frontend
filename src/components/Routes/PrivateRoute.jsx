import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'

export const PrivateRoute = () => {
  const { isAuth, isTokenValid, logout } = useAuthStore()

  // Check if user is authenticated and token is valid
  if (!isAuth || !isTokenValid()) {
    logout() // Log out user if the token is invalid
    return <Navigate to='/login' replace />
  }

  return <Outlet />
}
