import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { jwtDecode } from 'jwt-decode'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      access: '',
      refresh: '',
      isAuth: false,

      // Set tokens and update authentication status
      setToken: (access, refresh) => {
        set(() => ({
          access,
          refresh,
          isAuth: !!access && !!refresh,
        }))
        // Check token validity on setting
        if (!get().isTokenValid()) {
          set(() => ({ access: '', refresh: '', isAuth: false }))
        }
      },

      // Logout and clear tokens
      logout: () => {
        set(() => ({ access: '', refresh: '', isAuth: false }))
        localStorage.removeItem('auth')
      },

      // Check if the access token is valid
      isTokenValid: () => {
        const { access } = get()
        if (!access) return false

        try {
          const decoded = jwtDecode(access)
          const currentTime = Date.now() / 1000
          const isValid = decoded.exp > currentTime
          if (!isValid) {
            get().logout() // Auto logout if token is invalid
          }
          return isValid
        } catch (error) {
          console.error('Token decoding failed:', error)
          return false
        }
      },
    }),
    {
      name: 'auth',
      onRehydrateStorage: () => (state) => {
        if (state && state.access && !get().isTokenValid()) {
          state.logout() // Auto logout if token is invalid on rehydrate
        }
      },
    },
  ),
)
