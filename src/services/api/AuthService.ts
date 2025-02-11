import axiosInstance from '@/utils/axios-instance';
import apiRoutes from '@/routes/routes';
import UserPropsInterface from '@/src/interfaces/Auth/UserPropsInterface';
import MeInterfaceResponse from '@/src/interfaces/Auth/MeInterfaceResponse';
import PersonalDataInterface from '@/src/interfaces/Auth/PersonalDataInterface';

export const register = async (data: UserPropsInterface) => {
  try {
    return await axiosInstance().post(apiRoutes.auth.register, data);
  } catch (error: any) {
    throw error;
  }
};

export const me = async (): Promise <MeInterfaceResponse | null> => {
  try {
    const response = await axiosInstance()
      .get(apiRoutes.auth.me);

    return response.data.data as MeInterfaceResponse;
  } catch (error: any) {
    throw error;
  }
};

export const updatePersonalData = async (data: PersonalDataInterface) => {
  try {
    return await axiosInstance().put(apiRoutes.auth.personalData, data);
  } catch (error: any) {
    throw error.message();
  }
};