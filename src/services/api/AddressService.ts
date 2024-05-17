import axiosInstance from '@/utils/axios-instance';
import apiRoutes from '@/routes/routes';

export const getAddress = async (): Promise<AddressInterface | null> => {
  try {
    const response = await axiosInstance()
      .get(apiRoutes.address.get);

    return response.data as AddressInterface;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

export const createOrUpdateAddress = async (data: AddressInterface): Promise<AddressInterface | null> => {
  try {
    const response = await axiosInstance()
      .put(apiRoutes.address.get, data);

    return response.data as AddressInterface;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};