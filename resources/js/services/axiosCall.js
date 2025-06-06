import axios from "axios";

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // Replace with your API base URL
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
});
api.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token');
    if(token){
        let newToken = JSON.parse(token);
        config.headers.Authorization = `Bearer ${newToken.token}`
    }
    return config;
});

export default api;