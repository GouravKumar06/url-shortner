import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "https://url-shortner-rtfb.onrender.com/api",
  timeout: 10000, // 10 seconds timeout
  withCredentials: true, // Add this here
});

export default axiosInstance;