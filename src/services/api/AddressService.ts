import axiosInstance from '@/utils/axios-instance';
import apiRoutes from '@/routes/routes';

export const getAddress = async () => {
  try {
    return await axiosInstance()
      .get(apiRoutes.address.get);

  } catch (error: any) {
    console.log(error);
  }
};

export const createOrUpdate = async (data: any) => {
  try {
    return await axiosInstance()
      .put(apiRoutes.address.get, data);

  } catch (error: any) {
    console.log(error);
  }
};