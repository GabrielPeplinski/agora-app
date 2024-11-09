import environments from '@/config/environments';
import apiRoutes from '@/routes/routes';
import { uploadAsyncImageUri } from '@/src/services/api/Images/ExpoFileSystemService';

const baseUrl = environments.apiUrl;
const route: string = apiRoutes.userSolicitations.addImage;

export const addUserSolicitationImage = async (imageUri: string, fileName: string, userSolicitationId: string) => {
  const url = `${baseUrl}${route}`.replace(':id', userSolicitationId);

  try {
    await uploadAsyncImageUri({ url, imageUri, fileName });
  } catch (error: any) {
    throw error;
  }
};