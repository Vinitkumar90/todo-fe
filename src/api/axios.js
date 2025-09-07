import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

//now the request to api will alwas include jwt

export default api;