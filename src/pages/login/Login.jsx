import {useState} from 'react';
import {toast} from 'react-hot-toast';
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa6';
import {Navigate, useNavigate} from 'react-router-dom';
import {loginRequest} from '../../api/api';
import {useAuthStore} from '../../store/auth';

import {Loader} from '../../UI/loader/Loader';
import styles from './login.module.css';
import {TextField, Typography} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

export const Login = () => {
  const navigate = useNavigate();
  const {isAuth, setToken} = useAuthStore();
  const [isVisiblePassword, setVisiblePassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await loginRequest(email, password);

      // Überprüfen, ob Zugriffstoken und Aktualisierungstoken vorhanden sind
      if (response.access && response.refresh) {
        setToken(response.access, response.refresh);
        toast.success('Login successful!');
        navigate('/');
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      // Verbessere die Fehlernachricht, um sicherzustellen, dass immer eine Nachricht vorhanden ist
      const errorMessage = error.response?.data?.message || error.message || 'Login failed, please try again.';
      setError(errorMessage);
      toast.error('There was an error, please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Anzeigen des Loaders bei einer Anmeldungsanforderung
  if (loading)
    return (
      <div className={styles.wrapper} style={{alignItems: 'center'}}>
        <Loader/>
      </div>
    );

  // Wenn der Benutzer bereits authentifiziert ist, wird er zur Startseite weitergeleitet
  if (isAuth) return <Navigate to='/'/>;

  return (
    <form className='container mx-auto mt-10' onSubmit={handleSubmit}>
      <Typography variant='h6' className='mb-3 text-center'>
        Anmelden
      </Typography>
      <TextField
        label='E-mail'
        variant='outlined'
        margin='normal'
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type='email'
        id='email'
        name='email'
        placeholder='name@company.com'
        required
        className='mb-3'
      />

      <TextField
        label='Password'
        variant='outlined'
        margin='normal'
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type={isVisiblePassword ? 'text' : 'password'}
        id='password'
        name='password'
        placeholder='**********'
        required
        className='mb-3'
        InputProps={{
          endAdornment: (
            <IconButton
              edge='end'
              aria-label='toggle password visibility'
              onClick={() => setVisiblePassword(!isVisiblePassword)} // Direktes Binding
            >
              {isVisiblePassword ? (
                <FaRegEyeSlash className='position-absolute top-50 end-0 me-3 translate-middle-y'/>
              ) : (
                <FaRegEye className='position-absolute top-50 end-0 me-3 translate-middle-y'/>
              )}
            </IconButton>
          ),
        }}
      />

      <Button
        disabled={!email || !password || loading} // Verhindere mehrere Anfragen während des Ladens
        variant='contained'
        color='primary'
        fullWidth
        className='mb-3'
        type='submit'
      >
        Login
      </Button>
      {error && (
        <Typography color='error' className='text-center'>
          {error}
        </Typography>
      )}
    </form>
  );
};
