import React, { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { router } from 'expo-router';
import { errorToast } from '@/utils/use-toast';
import { View, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const MyCamera = () => {
  const cameraRef = useRef<Camera>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<null | boolean>(null);
  const [photoUri, setPhotoUri] = useState<string>();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (hasCameraPermission === false) {
      errorToast({ title: 'Permissão de câmera negada' });
      router.back();
    } else if (hasCameraPermission === undefined) {
      errorToast({ title: 'Permissão de câmera não definida' });
      router.back();
    }
  }, [hasCameraPermission]);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = {
        quality: 1,
        base64: true,
        exif: false,
      };

      const newPicture = await cameraRef.current.takePictureAsync(options);
      setPhotoUri(newPicture.uri);
    }
  };

  const clearPicture = () => {
    setPhotoUri(undefined);
  }

  return (
    <View style={styles.cameraContainer}>
      {photoUri ? (
        <Image source={{ uri: photoUri }} style={{flex:1}} />
      ) : (
        <Camera
          ref={cameraRef}
          style={{flex:1}}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
   flex: 1,
  },
});

export default MyCamera;