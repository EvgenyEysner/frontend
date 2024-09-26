import create from "zustand";
import {persist} from "zustand/middleware";
import {jwtDecode} from 'jwt-decode'; // Korrigierter Import

export const useAuthStore = create(
  persist(
    (set, get) => ({
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
        const {access} = get(); // Verwende get(), um den aktuellen Zustand zu erhalten
        if (!access) return false;

        try {
          const decoded = jwtDecode(access);
          const currentTime = Date.now() / 1000; // Zeit in Sekunden
          return decoded.exp > currentTime; // Vergleiche das Ablaufdatum mit der aktuellen Zeit
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
