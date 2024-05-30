import React, { useEffect } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { Portal, Text } from 'react-native-paper';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
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

  const handleDeleteImage = (uri: string) => {
    if (uri === coverImage) {
      setCoverImage(images[0] || null);
      setImages(prevImages => prevImages.filter(image => image !== images[0]));
    } else {
      setImages(prevImages => prevImages.filter(image => image !== uri));
    }
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <>
      <ScrollView>
        <View>
          <Portal>
            <Modal visible={isCameraModalVisible} onDismiss={hideModal}>
              <View>
                <TouchableOpacity style={styles.closeButton} onPress={hideModal}>
                  <MaterialCommunityIcons name="close-circle" size={24} color="black" />
                </TouchableOpacity>
                <MyCamera onTakePicture={handleTakePicture} />
              </View>
            </Modal>
            <CameraButton onPress={showModal} />
          </Portal>
        </View>

        <View style={ContainerBaseStyle.container}>
          <View style={styles.centeredContent}>
            <Text variant={'titleLarge'}>
              Fotos Reais do Problema
            </Text>

            <Text style={styles.centeredText} variant={'titleMedium'}>
              Foto de Capa
            </Text>

            {!coverImage ? (
              <View style={styles.centeredIcon}>
                <TouchableOpacity onPress={showModal}>
                  <MaterialIcons name="add-photo-alternate" size={160} color="black" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: coverImage }}
                  style={{ width: screenWidth, height: screenWidth }}
                  resizeMode="contain"
                />
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteImage(coverImage)}>
                  <MaterialCommunityIcons name="image-remove" size={24} color="black" />
                </TouchableOpacity>
              </View>
            )}

            {images.length > 0 && (
              <>
                <Text style={styles.centeredText} variant={'titleMedium'}>
                  Imagens Adicionais
                </Text>

                {images.map((image, index) => (
                  <View key={index} style={styles.imageContainer}>
                    <Image
                      source={{ uri: image }}
                      style={{ width: screenWidth, height: screenWidth }}
                      resizeMode="contain"
                    />
                    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteImage(image)}>
                      <MaterialCommunityIcons name="image-remove" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                ))}
              </>
            )}

          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  centeredText: {
    textAlign: 'center',
  },
  centeredIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  imageContainer: {
    position: 'relative',
  },
  centeredContent: {
    alignItems: 'center',
  },
});

export default SecondPageCreateSolicitationForm;