import axiosInstance from '@/utils/axios-instance';
import apiRoutes from '@/routes/routes';
import SolicitationListResponseInterface
  from '@/src/interfaces/Solicitation/Responses/SolicitationListResponseInterface';

export const createSolicitation = async (data: any) => {
  try {
    return await axiosInstance()
      .post(apiRoutes.mySolicitations.index, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  } catch (error: any) {
    if (error.response) {
      console.log('Erro do servidor:', error.response.data);
    } else {
      console.log('Erro:', error.message);
    }
  }
};

export const getMySolicitations = async (page: number = 1, statusFilter: string | null): Promise<SolicitationListResponseInterface | null> => {
  try {
    const response = await axiosInstance()
      .get(`${apiRoutes.mySolicitations.index}?filter[status]=${statusFilter}`, {
        params: {
          '?[page]': page,
        },
      });

    return response.data as SolicitationListResponseInterface;
  } catch (error: any) {
    if (error.response) {
      console.log('Erro do servidor:', error.response.data);
    } else {
      console.log('Erro:', error.message);
    }

    return null;
  }
};