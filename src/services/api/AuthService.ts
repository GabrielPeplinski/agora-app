import axiosInstance from '@/utils/axios-instance';
import apiRoutes from '@/routes/routes';
import UserPropsInterface from '@/src/interfaces/Auth/UserPropsInterface';

export const register = async (data: UserPropsInterface) => {
  try {
    return await axiosInstance().post(apiRoutes.auth.register, data);
  } catch (error: any) {
    if (error.response && error.response.status === 422) {
      throw new Error(JSON.stringify(error.response.data));
    } else {
      console.log(error);
    }
  }
};

export const me = async () => {
  try {
    return await axiosInstance().get(apiRoutes.auth.me);
  } catch (error: any) {
    console.log(error);
  }
};