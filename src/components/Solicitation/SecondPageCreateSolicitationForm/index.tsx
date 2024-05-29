import React from 'react';
import { View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Portal, Text } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import ContainerBaseStyle from '@/app/style';
import CameraButton from '@/src/components/Solicitation/CameraButton';
import MyCamera from '@/src/components/Shared/MyCamera';

interface CameraImageInterface {
  base64: string;
}

const SecondPageCreateSolicitationForm = () => {
  const [isCameraModalVisible, setIsCameraModalVisible] = React.useState(true);

  const hideModal = () => {
    setIsCameraModalVisible(false);
  };

  const showModal = () => {
    setIsCameraModalVisible(true);
  };

  return (
    <>
      <CameraButton onPress={showModal}/>

      <View>
        <Portal>
          <Modal visible={isCameraModalVisible} onDismiss={hideModal}>
            <View style={styles.modalContainerStyle}>
              <TouchableOpacity style={styles.closeButton} onPress={hideModal}>
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
              <MyCamera />
            </View>
          </Modal>
        </Portal>
      </View>

      <View style={ContainerBaseStyle.container}>
        <Text variant={'titleLarge'}>
          Fotos Reais do Problema
        </Text>
      </View>
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
});

export default SecondPageCreateSolicitationForm;