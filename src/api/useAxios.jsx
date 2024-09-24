import axios from 'axios'
import {useAuthStore} from '../store/auth'

const baseURL = import.meta.env.VITE_BACKEND_URL

export const axi = axios.create({
  baseURL,
})

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// async function refreshToken() {
//   const refreshToken = useAuthStore.getState().refresh
//   try {
//     const response = await axi.post('api/v1/refresh/', {refresh: refreshToken})
//     useAuthStore.getState().setToken(response.data.access, response.data.refresh)
//     return response.data.access
//   } catch (err) {
//     logout()
//     throw new Error('Session expired, please log in again.')
//   }
// }

//
// authAxios.interceptors.request.use(async (config) => {
//   let token = useAuthStore.getState().access
//   const decodedToken = jwtDecode(token)
//   const expiration = new Date(decodedToken.exp * 1000)
//   const now = new Date()
//
//   if (expiration.getTime() - now.getTime() < 1000 * 60 * 5) {
//     // Refresh if less than 5 minutes left
//     token = await refreshToken()
//   }
//
//   config.headers = {
//     Authorization: `Bearer ${token}`,
//   }
//
//   return config
// })

// Interceptor for Request
axiosInstance.interceptors.request.use(async (config) => {
    const {access, isTokenValid, logout} = useAuthStore.getState();
    if (!isTokenValid()) {
      logout(); // Execute logout if the token is invalid
      window.location.href = '/login'; // Login redirect
      return Promise.reject('Token abgelaufen'); // Cancel the request
    }
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor for Response
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token has expired or is invalid
      useAuthStore.getState().logout(); // Logout
      window.location.href = '/login'; // Login redirect
    }
    return Promise.reject(error);
  }
);
