import {create} from "zustand"
import {persist} from "zustand/middleware"
import {jwtDecode} from 'jwt-decode'

export const useAuthStore = create(
  persist(
    (set) => ({
      access: '',
      refresh: '',
      isAuth: false,
      setToken: (access, refresh) =>
        set(() => ({
          access,
          refresh,
          isAuth: !!access && !!refresh,
        })),
      logout: () => {
        set(() => ({access: '', refresh: '', isAuth: false}));
        localStorage.removeItem('auth');
      },
      isTokenValid: () => {
        const {access} = useAuthStore.getState();
        if (!access) return false;

        try {
          const decoded = jwtDecode(access);
          const currentTime = Date.now() / 1000; // Time in seconds
          return decoded.exp > currentTime; // Compare the expiration date with the current time
        } catch (error) {
          return false;
        }
      },
    }),
    {
      name: "auth"
    }
  )
);
