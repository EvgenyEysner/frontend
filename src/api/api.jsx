import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

export const client = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1",
    // baseURL: "https://demo.softeis.net/api/v1",
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }
});