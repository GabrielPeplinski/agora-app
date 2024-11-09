import environments from '@/config/environments';
import apiRoutes from '@/routes/routes';
import { uploadAsyncImageUri } from '@/src/services/api/Images/ExpoFileSystemService';

const baseUrl = environments.apiUrl;
const route: string = apiRoutes.mySolicitations.addImage;

export const addSolicitationImage = async (imageUri: string, fileName: string, mySolicitationId: string) => {
  const url = `${baseUrl}${route}`.replace(':id', mySolicitationId);

  try {
    await uploadAsyncImageUri({ url, imageUri, fileName });
  } catch (error: any) {
    throw error;
  }
};