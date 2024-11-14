import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'

export default function useLogout() {
  const navigate = useNavigate()
  const { logout } = useAuthStore()

  return () => {
    try {
      logout()
      navigate('/login', { replace: true }) // Ensure history is cleared on logout
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }
}
