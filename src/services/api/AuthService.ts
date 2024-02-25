import axiosInstance from '@/utils/axios-instance';

export const register = async (data: any) => {
  try {
    return await axiosInstance().post('auth/register', data);
  } catch (error: any) {
    console.log(error.stack);
  }
};
