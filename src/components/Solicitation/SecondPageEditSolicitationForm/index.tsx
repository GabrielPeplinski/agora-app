import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Image, ScrollView, Dimensions, Alert } from 'react-native';
import { Portal, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ContainerBaseStyle from '@/app/style';
import CameraButton from '@/src/components/Solicitation/CameraButton';
import MyCamera from '../MyCamera';
import UpdateSolicitationFormDataInterface from '@/src/interfaces/Solicitation/Form/UpdateSolicitationFormDataInterface';

interface Props {
  values: UpdateSolicitationFormDataInterface;
  setValues: React.Dispatch<React.SetStateAction<UpdateSolicitationFormDataInterface>>;
}

const screenWidth = Dimensions.get('window').width;

const SecondPageEditSolicitationForm: React.FC<Props> = ({ values, setValues }) => {
  const [isCameraModalVisible, setIsCameraModalVisible] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(values.coverImage);
  const [images, setImages] = useState<string[]>(values.images);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<string[]>([]);

  const hideModal = () => setIsCameraModalVisible(false);
  const showModal = () => setIsCameraModalVisible(true);

  useEffect(() => {
    setCoverImage(values.coverImage);
    setImages(values.images);
  }, [values.coverImage, values.images]);

  useEffect(() => {
    setValues((prevValues) => ({
      ...prevValues,
      newImages: newImages,
      imagesToDelete: imagesToDelete
    }));
  }, [newImages, imagesToDelete]);

  const handleTakePicture = (uri: string) => {
    if (!values.coverImage) {
      setValues((prevValues) => ({ ...prevValues, coverImage: uri }));
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        images: [...prevValues.images, uri]
      }));
    }
    setNewImages((prevNewImages) => [...prevNewImages, uri]);
    hideModal();
  };

  const confirmDeleteImage = (uri: string) => {
    Alert.alert(
      'Remover Imagem',
      'Deseja realmente remover esta imagem?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Remover', onPress: () => handleDeleteImage(uri) },
      ],
    );
  };

  const handleDeleteImage = (uri: string) => {
    if (uri === values.coverImage) {
      const newCoverImage = values.images.length > 0 ? values.images[0] : null;
      const newImagesArray = newCoverImage ? values.images.slice(1) : values.images;
      setValues((prevValues) => ({
        ...prevValues,
        coverImage: newCoverImage,
        images: newImagesArray
      }));
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        images: prevValues.images.filter((image) => image !== uri)
      }));
    }

    // Adiciona o URI da imagem deletada ao array imagesToDelete, se não for uma nova imagem
    setImagesToDelete((prevImagesToDelete) =>
      !newImages.includes(uri) && !prevImagesToDelete.includes(uri)
        ? [...prevImagesToDelete, uri]
        : prevImagesToDelete
    );

    // Remove a imagem de newImages, caso seja uma nova imagem que o usuário deseja remover
    setNewImages((prevNewImages) => prevNewImages.filter((newImage) => newImage !== uri));
  };

  const totalImages = (values.coverImage ? 1 : 0) + values.images.length;

  return (
    <>
      <ScrollView>
        <View>
          <Portal>
            <Modal
              visible={isCameraModalVisible}
              onRequestClose={hideModal}
              transparent={true}
              animationType="slide"
            >
              <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={hideModal}>
                  <MaterialCommunityIcons name="close-circle" size={30} color="red" />
                </TouchableOpacity>
                <MyCamera onTakePicture={handleTakePicture} />
              </View>
            </Modal>

            {totalImages < 5 && <CameraButton onPress={showModal} />}
          </Portal>
        </View>

        <View style={ContainerBaseStyle.container}>
          <View style={styles.centeredContent}>
            <Text variant={'titleLarge'}>Fotos Reais do Problema</Text>

            <Text style={styles.centeredText} variant={'titleMedium'}>
              Foto de Capa
            </Text>

            {!values.coverImage ? (
              <View style={styles.centeredIcon}>
                <MaterialCommunityIcons name="image-off" size={200} color="black" />
              </View>
            ) : (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: values.coverImage }}
                  style={{ width: screenWidth, height: screenWidth * 0.9 }}
                  resizeMode="contain"
                />
                <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDeleteImage(values.coverImage!)}>
                  <MaterialCommunityIcons name="image-remove" size={24} color="red" />
                </TouchableOpacity>
              </View>
            )}

            {values.images.length > 0 && (
              <>
                <Text style={styles.centeredText} variant={'titleMedium'}>
                  Imagens Adicionais
                </Text>

                {values.images.map((image, index) => (
                  <View key={index} style={styles.imageContainer}>
                    <Image
                      source={{ uri: image }}
                      style={{ width: screenWidth, height: screenWidth * 0.9 }}
                      resizeMode="contain"
                    />
                    <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDeleteImage(image)}>
                      <MaterialCommunityIcons name="image-remove" size={24} color="red" />
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
  centeredContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  centeredText: {
    textAlign: 'center',
  },
  imageContainer: {
    position: 'relative',
    marginVertical: 10,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
});

export default SecondPageEditSolicitationForm;
