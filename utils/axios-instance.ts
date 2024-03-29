import axios from 'axios';
import environments from '@/config/environments';
import { useAuthStore } from '@/src/stores/authStore';

const axiosInstance = () => {
  const instance = axios.create({
    baseURL: environments.apiUrl,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    withCredentials: true,
    timeout: 5000
  })

  instance.interceptors.request.use(
    request => {
      const authToken = useAuthStore.getState().token;
      if (authToken) {
        request.headers['Authorization'] = `Bearer ${authToken}`
      }

      return request
    },
    error => {
      return Promise.reject(error)
    },
  )

  return instance;
}

export default axiosInstance;