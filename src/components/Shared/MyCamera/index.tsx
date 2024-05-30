import React, { useEffect, useRef, useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { router } from 'expo-router';
import { errorToast } from '@/utils/use-toast';
import { Image, StyleSheet, View, Alert } from 'react-native';
import { FAB } from 'react-native-paper';

interface MyCameraProps {
  onTakePicture: (uri: string) => void
}

const MyCamera = (props: MyCameraProps) => {
  const cameraRef = useRef<Camera>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<null | boolean>(null);
  const [photoUri, setPhotoUri] = useState<string>();
  const [cameraType, setCameraType] = useState(CameraType.back);

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

      Alert.alert(
        "Confirmação para Uso de Foto",
        "Deseja utilizar esta foto?",
        [
          {
            text: "Cancelar",
            onPress: () => clearPicture(),
            style: "cancel"
          },
          { text: "OK", onPress: () => props.onTakePicture(newPicture.uri) }
        ]
      );
    }
  };

  const clearPicture = () => {
    setPhotoUri(undefined);
  }

  const toggleCamera = () => {
    setCameraType(
      cameraType === CameraType.back
        ? CameraType.front
        : CameraType.back
    );
  }

  return (
    <View style={styles.cameraContainer}>
      {photoUri ? (
        <Image source={{ uri: photoUri }} style={{flex:1}} />
      ) : (
        <Camera
          ref={cameraRef}
          style={{flex:1}}
          type={cameraType}
        />
      )}
      <View style={styles.fabContainer}>
        <FAB style={styles.fab} icon="camera" onPress={takePicture} />
        <FAB style={styles.fab} icon="delete" onPress={clearPicture} />
        <FAB style={styles.fab} icon="camera-switch" onPress={toggleCamera} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 2,
  },
  fabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  fab: {
    margin: 10,
  },
});

export default MyCamera;