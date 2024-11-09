import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FileSystemUploadAsyncProps {
  url: string;
  imageUri: string;
  fileName: string;
}

export const uploadAsyncImageUri = async ({ url, imageUri, fileName }: FileSystemUploadAsyncProps) => {
  const token = await AsyncStorage.getItem('token');

  await FileSystem
    .uploadAsync(url, imageUri, {
      fieldName: fileName,
      httpMethod: 'POST',
      uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
};