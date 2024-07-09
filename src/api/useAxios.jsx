import axios from 'axios';
import {useAuthStore} from '../redux/auth';
import {jwtDecode} from "jwt-decode";

const baseURL = import.meta.env.VITE_BACKEND_URL;

export const axi = axios.create({
    baseURL
});

export const authAxios = axios.create({
    baseURL,
    withCredentials: true
});

function logout() {
    useAuthStore.getState().logout();
    window.location.href = 'api/v1/login';
}

async function refreshToken() {
    const refreshToken = useAuthStore.getState().refresh;
    try {
        const response = await axi.post('api/v1/refresh/', {refresh: refreshToken});
        useAuthStore.getState().setToken(response.data.access, response.data.refresh);
        return response.data.access;
    } catch (err) {
        logout();
        throw new Error("Session expired, please log in again.");
    }
}

authAxios.interceptors.request.use(async (config) => {
    let token = useAuthStore.getState().access;
    const decodedToken = jwtDecode(token);
    const expiration = new Date(decodedToken.exp * 1000);
    const now = new Date();

    if (expiration.getTime() - now.getTime() < 1000 * 60 * 5) {  // Refresh if less than 5 minutes left
        token = await refreshToken();
    }

    config.headers = {
        Authorization: `Bearer ${token}`,
    };

    return config;
});
