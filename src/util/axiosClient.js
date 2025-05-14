import axios from "axios";
import { toast } from "react-hot-toast";



const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});

// Add Authorization header to every request
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");

    // Optional client-side expiry check
    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const isExpired = payload.exp * 1000 < Date.now();
        if (isExpired) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
            toast.error("Session expired. Please login again.");
            window.location.href = "/";
            return Promise.reject(new Error("Token expired"));
        }

        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle 401 Unauthorized responses
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
            toast.error("Unauthorized! Please login again.");
            window.location.href = "/";
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
