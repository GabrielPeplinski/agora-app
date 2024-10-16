import axiosInstance from '@/utils/axios-instance';
import apiRoutes from '@/routes/routes';
import SolicitationListResponseInterface
  from '@/src/interfaces/Solicitation/Responses/SolicitationListResponseInterface';
import SolicitationResponseInterface from '@/src/interfaces/Solicitation/Responses/SolicitationResponseInterface';

export const getSolicitations = async (page: number = 1): Promise<SolicitationListResponseInterface | null> => {
  try {
    const response = await axiosInstance()
      .get(`${apiRoutes.solicitations.index}?page=${page}`);

    return response.data as SolicitationListResponseInterface;
  } catch (error: any) {
    throw error;
  }
};

export const getSolicitation = async (solicitationId: number | string): Promise<SolicitationResponseInterface | null> => {
  try {
    const response = await axiosInstance()
      .get(`${apiRoutes.solicitations.index}/${solicitationId}`);

    return response.data as SolicitationResponseInterface;
  } catch (error: any) {
    throw error;
  }
}

