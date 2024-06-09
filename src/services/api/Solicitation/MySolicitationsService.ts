import axiosInstance from '@/utils/axios-instance';
import apiRoutes from '@/routes/routes';
import SolicitationListResponseInterface
  from '@/src/interfaces/Solicitation/Responses/SolicitationListResponseInterface';
import SolicitationResponseInterface from '@/src/interfaces/Solicitation/Responses/SolicitationResponseInterface';
import SolicitationDataInterface from '@/src/interfaces/Solicitation/Data/SolicitationDataInterface';

export const getMySolicitations = async (page: number = 1, statusFilter: string | null): Promise<SolicitationListResponseInterface | null> => {
  try {
    const response = await axiosInstance()
      .get(`${apiRoutes.mySolicitations.index}?filter[status]=${statusFilter}&page=${page}`);

    return response.data as SolicitationListResponseInterface;
  } catch (error: any) {
    throw error;
  }
};

export const createSolicitation = async (data: SolicitationDataInterface): Promise<SolicitationResponseInterface> => {
  try {
    const response = await axiosInstance()
      .post(apiRoutes.mySolicitations.index, data);

    return response.data.data;

  } catch (error: any) {
    throw error;
  }
};

