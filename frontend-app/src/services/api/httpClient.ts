import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3000/', //TODO: env variable
});

client.interceptors.request.use(function (config) {
    const token = localStorage.getItem('authToken'); //TODO: env variable
    config.headers.Authorization =  `Bearer ${token}`;
    return config;
});

export default client;
