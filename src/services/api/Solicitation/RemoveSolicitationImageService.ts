import axiosInstance from '@/utils/axios-instance';
import apiRoutes from '@/routes/routes';
import environments from '@/config/environments';

interface RemoveSolicitationImageInterface {
  imageUrls: string[];
}

const baseUrl = environments.apiUrl;
const route: string = apiRoutes.mySolicitations.removeImages;

export const removeSolicitationImages = async (solicitationId: number|string, data: RemoveSolicitationImageInterface) => {
  try {
    const url = `${baseUrl}${route}`.replace(':id', solicitationId.toString());
    console.log(url)

    return await axiosInstance()
      .post(url, data);
  } catch (error: any) {
    throw error;
  }
};