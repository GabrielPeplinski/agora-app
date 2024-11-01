import axiosInstance from '@/utils/axios-instance';
import apiRoutes from '@/routes/routes';
import SolicitationListResponseInterface
  from '@/src/interfaces/Solicitation/Responses/SolicitationListResponseInterface';
import SolicitationResponseInterface from '@/src/interfaces/Solicitation/Responses/SolicitationResponseInterface';

export const getSolicitations = async (
  latitude: number|null = null,
  longitude: number|null = null
): Promise<SolicitationListResponseInterface | null> => {
  try {
    const url = latitude && longitude
      ? `${apiRoutes.solicitations.index}?perPage=100&filter[current_location]=${latitude},${longitude}`
      : `${apiRoutes.solicitations.index}?perPage=30`;

    const response = await axiosInstance().get(url);

    return response.data as SolicitationListResponseInterface;
  } catch (error: any) {
    throw error;
  }
};

export const getSolicitation = async (solicitationId: number | string): Promise<SolicitationResponseInterface | null> => {
  try {
    const response = await axiosInstance()
      .get(`${apiRoutes.solicitations.index}/${solicitationId}`);

    return response.data.data as SolicitationResponseInterface;
  } catch (error: any) {
    throw error;
  }
}

