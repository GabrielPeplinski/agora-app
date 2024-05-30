import React, { useEffect } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { Portal, Text } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import ContainerBaseStyle from '@/app/style';
import CameraButton from '@/src/components/Solicitation/CameraButton';
import MyCamera from '@/src/components/Shared/MyCamera';

const SecondPageCreateSolicitationForm = () => {
  const [isCameraModalVisible, setIsCameraModalVisible] = React.useState(false);
  const [coverImage, setCoverImage] = React.useState<string | null>(null);
  const [images, setImages] = React.useState<string[]>([]);

  const hideModal = () => {
    setIsCameraModalVisible(false);
  };

  const showModal = () => {
    setIsCameraModalVisible(true);
  };

  useEffect(() => {
    console.log('coverImage', coverImage);
    console.log('images', images);
  }, [coverImage, images]);

  const handleTakePicture = (uri: string) => {

    if (!coverImage) {
      setCoverImage(uri);
    } else {
      setImages(prevImages => [...prevImages, uri]);
    }

    hideModal();
  };

  const screenHeight = Dimensions.get('window').height;

  return (
    <>
      <ScrollView>
        <View>
          <Portal>
            <Modal visible={isCameraModalVisible} onDismiss={hideModal}>
              <View style={styles.modalContainerStyle}>
                <TouchableOpacity style={styles.closeButton} onPress={hideModal}>
                  <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity>
                <MyCamera onTakePicture={handleTakePicture} />
              </View>
            </Modal>
            <CameraButton onPress={showModal} />
          </Portal>
        </View>

        <View style={ContainerBaseStyle.container}>
          <View>
            <Text variant={'titleLarge'}>
              Fotos Reais do Problema
            </Text>
            {coverImage && (
              <View>
                <Text style={styles.centeredText} variant={'titleMedium'}>
                  Foto Principal
                </Text>
                <Image
                  source={{ uri: coverImage }}
                  style={{ width: screenHeight * 0.5, height: screenHeight * 0.5 }}
                />
              </View>
            )}

            <Text style={styles.centeredText} variant={'titleMedium'}>
              Imagens Adicionais
            </Text>

            {images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={{ width: screenHeight * 0.5, height: screenHeight * 0.5 }}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainerStyle: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  centeredText: {
    textAlign: 'center',
  },
});

export default SecondPageCreateSolicitationForm;