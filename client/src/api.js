import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080', // Replace with your backend's base URL
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(config);
    return config;
});

export default api;
