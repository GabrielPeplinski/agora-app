import React, { useEffect } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Image, ScrollView, Dimensions, Alert } from 'react-native';
import { Portal, Text } from 'react-native-paper';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import ContainerBaseStyle from '@/app/style';
import CameraButton from '@/src/components/Solicitation/CameraButton';
import MyCamera from '../MyCamera';

interface FormData {
  title: string;
  description: string;
  solicitationCategoryId: number;
  latitudeCoordinates: string;
  longitudeCoordinates: string;
  coverImage: string | null;
  images: string[];
}

interface Props {
  values: FormData;
  setValues: React.Dispatch<React.SetStateAction<FormData>>;
}

const screenWidth = Dimensions.get('window').width;

const SecondPageCreateSolicitationForm: React.FC<Props> = ({ values, setValues }) => {
  const [isCameraModalVisible, setIsCameraModalVisible] = React.useState(false);

  const hideModal = () => setIsCameraModalVisible(false);
  const showModal = () => setIsCameraModalVisible(true);

  useEffect(() => {
    console.log('coverImage', values.coverImage);
    console.log('images', values.images);
  }, [values.coverImage, values.images]);

  const handleTakePicture = (uri: string) => {
    if (!values.coverImage) {
      setValues((prevValues) => ({ ...prevValues, coverImage: uri }));
    } else {
      setValues((prevValues) => ({ ...prevValues, images: [...prevValues.images, uri] }));
    }
    hideModal();
  };

  const confirmDeleteImage = (uri: string) => {
    Alert.alert(
      'Remover Imagem',
      'Deseja realmente remover esta imagem?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          onPress: () => handleDeleteImage(uri),
        },
      ],
    );
  };

  const handleDeleteImage = (uri: string) => {
    if (uri === values.coverImage) {
      const newCoverImage = values.images.length > 0 ? values.images[0] : null;
      const newImages = newCoverImage ? values.images.slice(1) : values.images;

      setValues((prevValues) => ({
        ...prevValues,
        coverImage: newCoverImage,
        images: newImages,
      }));
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        images: prevValues.images.filter((image) => image !== uri),
      }));
    }
  };

  const totalImages = (values.coverImage ? 1 : 0) + values.images.length;

  return (
    <>
      <ScrollView>
        <View>
          <Portal>
            <Modal visible={isCameraModalVisible} onDismiss={hideModal}>
              <View>
                <TouchableOpacity style={styles.closeButton} onPress={hideModal}>
                  <MaterialCommunityIcons name="close-circle" size={30} color="red" />
                </TouchableOpacity>
                <MyCamera onTakePicture={handleTakePicture} />
              </View>
            </Modal>
            {totalImages < 5 && (
              <CameraButton onPress={showModal} />
            )}
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
                <TouchableOpacity onPress={showModal}>
                  <MaterialIcons name="add-photo-alternate" size={160} color="black" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: values.coverImage }}
                  style={{ width: screenWidth, height: screenWidth }}
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
                      style={{ width: screenWidth, height: screenWidth }}
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
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
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
});

export default SecondPageCreateSolicitationForm;
