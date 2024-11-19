// import { Navigate, Outlet } from 'react-router-dom'
// import { useAuthStore } from '../../store/auth'
//
// export const PrivateRoute = () => {
//   const { isAuth, isTokenValid, logout } = useAuthStore()
//
//   // Check if user is authenticated and token is valid
//   if (!isAuth || !isTokenValid()) {
//     logout() // Log out user if the token is invalid
//     return <Navigate to='/login' replace />
//   }
//
//   return <Outlet />
// }


import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import useLogout from '../../hooks/useLogout';

export const PrivateRoute = () => {
  const { isAuth, isTokenValid } = useAuthStore();
  const logout = useLogout();
  const shouldLogout = !isAuth || !isTokenValid();

  useEffect(() => {
    if (shouldLogout) {
      logout(); // Log out and navigate only after the component has finished rendering
      return <Navigate to='/login' replace />
    }
  }, [shouldLogout, logout]);

  if (shouldLogout) {
    return null; // Render nothing while `logout` is handled in `useEffect`
  }

  return <Outlet />;
};
