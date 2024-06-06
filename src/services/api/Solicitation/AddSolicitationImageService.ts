import * as FileSystem from 'expo-file-system';
import environments from '@/config/environments';
import apiRoutes from '@/routes/routes';

const baseUrl = environments.apiUrl;
const route: string = apiRoutes.mySolicitations.addImage;

export const addSolicitationImage = async (imageUri: string, fileName: string) => {
  console.log(`${baseUrl}/${route}`);
  try {
    await FileSystem
      .uploadAsync(`${baseUrl}${route}`, imageUri, {
        fieldName: fileName,
        httpMethod: 'POST',
        uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
      });
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};