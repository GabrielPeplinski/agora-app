import axios from 'axios';
import environments from '@/config/environments';

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
      // if (authToken) {
      //   request.headers['Authorization'] = `Bearer ${authToken}`
      // }

      return request
    },
    error => {
      return Promise.reject(error)
    },
  )

  return instance;
}

export default axiosInstance;