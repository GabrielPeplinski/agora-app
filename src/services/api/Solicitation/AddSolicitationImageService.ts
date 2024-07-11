import * as FileSystem from 'expo-file-system';
import environments from '@/config/environments';
import apiRoutes from '@/routes/routes';

const baseUrl = environments.apiUrl;
const route: string = apiRoutes.mySolicitations.addImage;

export const addSolicitationImage = async (imageUri: string, fileName: string, mySolicitationId: string) => {
  const url = `${baseUrl}${route}`.replace(':id', mySolicitationId);

  try {
    await FileSystem
      .uploadAsync(url, imageUri, {
        fieldName: fileName,
        httpMethod: 'POST',
        uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
      });
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};