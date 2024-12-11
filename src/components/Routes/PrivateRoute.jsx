import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import useLogout from '../../hooks/useLogout';

export const PrivateRoute = () => {
  const { isAuth, isTokenValid } = useAuthStore();
  const logout = useLogout();

  // Check if the user should be logged out
  if (!isAuth || !isTokenValid()) {
    logout(); // Log out the user synchronously
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
