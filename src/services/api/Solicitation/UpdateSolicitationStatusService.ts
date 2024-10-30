import apiRoutes from '@/routes/routes';
import axiosInstance from '@/utils/axios-instance';
import UserSolicitationResponseInterface from '@/src/interfaces/Solicitation/Responses/UserSolicitationInterface';
import UpdateSolicitationStatusDataInterface
  from '@/src/interfaces/Solicitation/Data/UpdateSolicitationStatusDataInterface';

export const updateSolicitationStatus = async (
  solicitationId: number | string,
  data: UpdateSolicitationStatusDataInterface,
): Promise<UserSolicitationResponseInterface | null> => {
  try {
    const response = await axiosInstance()
      .put(`${apiRoutes.mySolicitations}/${solicitationId}/status`, data);

    return response.data.data as UserSolicitationResponseInterface;
  } catch (error: any) {
    throw error;
  }
};