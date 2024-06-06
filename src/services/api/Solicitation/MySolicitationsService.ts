import axiosInstance from '@/utils/axios-instance';
import apiRoutes from '@/routes/routes';
import SolicitationListResponseInterface
  from '@/src/interfaces/Solicitation/Responses/SolicitationListResponseInterface';
import SolicitationInterface from '@/src/interfaces/Solicitation/SolicitationInterface';

export const getMySolicitations = async (page: number = 1, statusFilter: string | null): Promise<SolicitationListResponseInterface | null> => {
  try {
    const response = await axiosInstance()
      .get(`${apiRoutes.mySolicitations.index}?filter[status]=${statusFilter}?page=${page}`);

    return response.data as SolicitationListResponseInterface;
  } catch (error: any) {
    throw error;
  }
};

export const createSolicitation = async (data: SolicitationInterface): Promise<SolicitationInterface> => {
  try {
    return await axiosInstance()
      .post(apiRoutes.mySolicitations.index, data);

  } catch (error: any) {
    throw error;
  }
};

