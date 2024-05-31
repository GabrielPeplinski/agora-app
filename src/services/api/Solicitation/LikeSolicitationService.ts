import axiosInstance from '@/utils/axios-instance';
import apiRoutes from '@/routes/routes';
import LikeSolicitationInterface from '@/src/interfaces/Solicitation/LikeSolicitationInterface';

export const like = async (data: LikeSolicitationInterface) => {
  try {
    return await axiosInstance().post(apiRoutes.solicitation.like, data);
  } catch (error: any) {
    console.log(error);
  }
};