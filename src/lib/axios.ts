import axios from "axios"
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
})

// Request interceptor for adding auth tokens
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = Cookies.get("auth-token");
    if (token) {
      config.headers.Authorization =  `${token}`;
    }
    if (config.data instanceof FormData) {
      // Let Axios handle boundary automatically
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor for handling errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Handle unauthorized access
      Cookies.remove("auth-token")
      // window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
