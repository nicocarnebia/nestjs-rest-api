import axios from 'axios';
import { AUTH_TOKEN_STORAGE_KEY } from '../../constants/jwt'


const client = axios.create({
  baseURL: process.env.API_URL,
});

client.interceptors.request.use(function (config) {
    const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
    config.headers.Authorization =  `Bearer ${token}`;
    return config;
});

export default client;
