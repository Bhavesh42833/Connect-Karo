import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"https://connect-karo.onrender.com" || "http://localhost:3000",
    withCredentials:true
})

export default axiosInstance