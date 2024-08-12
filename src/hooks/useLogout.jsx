import { useNavigate } from 'react-router'
import { useAuthStore } from '../store/auth'

export default function useLogout() {
  const navigate = useNavigate()
  const { logout } = useAuthStore()

  return () => {
    logout()
    navigate('/login')
  }
}
