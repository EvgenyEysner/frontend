import {Navigate, Outlet} from 'react-router-dom'
import {useAuthStore} from '../../store/auth'

export const PrivateRoute = () => {
  const {isAuth, isTokenValid, logout} = useAuthStore()
  if (!isAuth || !isTokenValid()) {
    logout(); // Log out user if the token is invalid
    return <Navigate to="/login"/>;
  } else {
    return <Outlet/>
  }
}
