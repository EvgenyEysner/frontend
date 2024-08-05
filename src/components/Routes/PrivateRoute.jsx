import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../redux/auth'

export const PrivateRoute = () => {
  const { isAuth } = useAuthStore()
  return isAuth ? <Outlet /> : <Navigate to='/login' />
}
