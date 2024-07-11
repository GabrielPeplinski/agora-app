import axiosInstance from '@/utils/axios-instance';
import apiRoutes from '@/routes/routes';
import SolicitationListResponseInterface
  from '@/src/interfaces/Solicitation/Responses/SolicitationListResponseInterface';

export const getSolicitations = async (page: number = 1): Promise<SolicitationListResponseInterface | null> => {
  try {
    const response = await axiosInstance()
      .get(`${apiRoutes.solicitations.index}?page=${page}`);

    return response.data as SolicitationListResponseInterface;
  } catch (error: any) {
    throw error;
  }
};

