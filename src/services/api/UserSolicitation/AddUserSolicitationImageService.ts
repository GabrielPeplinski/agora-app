import * as FileSystem from 'expo-file-system';
import environments from '@/config/environments';
import apiRoutes from '@/routes/routes';

const baseUrl = environments.apiUrl;
const route: string = apiRoutes.userSolicitations.addImage;

export const addUserSolicitationImage = async (imageUri: string, fileName: string, userSolicitationId: string) => {
  const url = `${baseUrl}${route}`.replace(':id', userSolicitationId);

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