import axiosInstance from '@/utils/axios-instance';
import apiRoutes from '@/routes/routes';

export const register = async (data: any) => {
  try {
    return await axiosInstance().post(apiRoutes.auth.register, data);
  } catch (error: any) {
    console.log(error);
  }
};

export const me = async () => {
  try {
    return await axiosInstance().get(apiRoutes.auth.me);
  } catch (error: any) {
    console.log(error);
  }
};