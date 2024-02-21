import axios from 'axios';
import environments from '@/config/environments';

const axiosInstance = () => {
  return axios.create({
    baseURL: environments.apiUrl,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    withCredentials: true,
    timeout: 5000
  })
}

export default axiosInstance;