import * as FileSystem from 'expo-file-system';

/**
 * Convert image to base64
 * @param imageUri
 * @return Image
 */
export async function convertImageToBase64(imageUri: string) {
  try {
    const base64 = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return `data:image/jpg;base64,${base64}`;
  } catch (error) {
    console.error(error);
    return null;
  }
}