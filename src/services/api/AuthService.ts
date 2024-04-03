import axiosInstance from '@/utils/axios-instance';
import apiRoutes from '@/routes/routes';
import { useAuthStore } from '@/src/stores/authStore';
import HttpStatusEnum from '@/src/enums/HttpStatusEnum';

export const register = async (data: any) => {
  try {
    return await axiosInstance().post(apiRoutes.auth.register, data);
  } catch (error: any) {
    console.log(error);
  }
};

export const login = async (data: any) => {
  try {
    const response = await axiosInstance().post(apiRoutes.auth.login, data);

    if (response.status === HttpStatusEnum.CREATED) {
      useAuthStore.getState().login(response.data.user, response.data.token);
    }

    return response;
  } catch (error: any) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance().delete(apiRoutes.auth.logout);

    if (response.status === HttpStatusEnum.NO_CONTENT) {
      useAuthStore.getState().logout();
    }
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