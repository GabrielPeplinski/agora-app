import axiosInstance from '@/utils/axios-instance';
import apiRoutes from '@/routes/routes';
import LikeSolicitationInterface from '@/src/interfaces/Solicitation/LikeSolicitationInterface';

export const likeSolicitation = async (data: LikeSolicitationInterface) => {
  try {

    return await axiosInstance()
      .post(apiRoutes.solicitations.like, data);
  } catch (error: any) {
    throw error;
  }
};