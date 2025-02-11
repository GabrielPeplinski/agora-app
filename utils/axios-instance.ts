import axios from 'axios';
import environments from '@/config/environments';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    async request => {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        request.headers['Authorization'] = `Bearer ${token}`
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