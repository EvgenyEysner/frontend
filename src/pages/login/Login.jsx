import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { Navigate, useNavigate } from 'react-router-dom'
import { loginRequest } from '../../api/api'
import { useAuthStore } from '../../redux/auth'

import { Loader } from '../../UI/loader/Loader'
import styles from './login.module.css'

export const Login = () => {
  const navigate = useNavigate()
  const { isAuth, setToken } = useAuthStore()
  const [isVisiblePassword, setVisiblePassword] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isCheck, setCheck] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  console.log(error)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const response = await loginRequest(email, password)
      setToken(response.access, response.refresh)
      toast.success('Login successful!')
      navigate('/')
    } catch (error) {
      setError(error.response?.message || 'Login failed, please try again.')
      toast.error('There was an error, please try again.')
      setLoading(false)
    }
  }

  if (loading)
    return (
      <div className={styles.wrapper} style={{ alignItems: 'center' }}>
        <Loader />
      </div>
    )
  if (isAuth) return <Navigate to='/' />

  return (
    <form className={styles.wrapper + ' container'} onSubmit={handleSubmit}>
      <h3 className='mb-3 fs-4 fw-semibold'>Einloggen</h3>
      <div className='mb-3 d-flex gap-1 flex-column'>
        <label>E-mail</label>
        <input
          className='form-control'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='email'
          name='email'
          id='email'
          placeholder='name@company.com'
          required
        />
      </div>
      <div className='mb-3 d-flex gap-1 flex-column'>
        <label htmlFor='password'>Password</label>
        <div className='position-relative'>
          <input
            value={password}
            type={isVisiblePassword ? 'text' : 'password'}
            className='form-control pe-5'
            placeholder='**********'
            name='password'
            id='password'
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {isVisiblePassword ? (
            <FaRegEyeSlash
              onClick={() => setVisiblePassword(false)}
              className='position-absolute top-50 end-0 me-3 translate-middle-y'
              role='button'
            />
          ) : (
            <FaRegEye
              onClick={() => setVisiblePassword(true)}
              className='position-absolute top-50 end-0 me-3 translate-middle-y'
              role='button'
            />
          )}
        </div>
      </div>
      <div className='mb-3'>
        <div className='custom-control custom-checkbox gap-2 d-flex align-items-center'>
          <input
            checked={isCheck}
            onChange={(e) => setCheck(e.target.checked)}
            type='checkbox'
            className='custom-control-input'
            id='customCheck1'
          />
          <label htmlFor='customCheck1' className='text-black small' style={{ opacity: '0.6' }}>
            Принимаю условия
          </label>
        </div>
      </div>
      <div className='d-grid'>
        <button
          disabled={!password || !email || !isCheck}
          type='submit'
          className='btn btn-primary'
        >
          Login
        </button>
      </div>
      <p className='forgot-password text-right text-black small mt-1' style={{ opacity: '0.6' }}>
        Forgot{' '}
        <a href='#' style={{ color: 'inherit', textDecoration: 'none' }}>
          password?
        </a>
      </p>
    </form>
  )
}
