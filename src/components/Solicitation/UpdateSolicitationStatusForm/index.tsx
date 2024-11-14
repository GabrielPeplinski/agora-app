import React, { useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import { Formik } from 'formik';
import { Button, Text } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import SolicitationStatusEnum from '@/src/enums/SolicitationStatusEnum';
import { getTranslatedSolicitationStatus } from '@/utils/helpers';
import MyCamera from '../MyCamera';
import SolicitationResponseInterface from '@/src/interfaces/Solicitation/Responses/SolicitationResponseInterface';
import CameraButton from '@/src/components/Solicitation/CameraButton';
import FormError from '@/src/components/Shared/FormError';
import UpdateSolicitationStatusValidation from '@/src/validations/Solicitation/UpdateSolicitationStatusValidation';
import UpdateSolicitationStatusDataInterface from '@/src/interfaces/Solicitation/Data/UpdateSolicitationStatusDataInterface';
import { updateSolicitationStatus } from '@/src/services/api/Solicitation/UpdateSolicitationStatusService';
import { errorToast, successToast } from '@/utils/use-toast';
import { addUserSolicitationImage } from '@/src/services/api/UserSolicitation/AddUserSolicitationImageService';
import { useRouter } from 'expo-router';

const statusOptions = [
  { label: 'Em aberto', value: SolicitationStatusEnum.OPEN },
  { label: 'Em progresso', value: SolicitationStatusEnum.IN_PROGRESS },
  { label: 'Resolvido', value: SolicitationStatusEnum.RESOLVED },
];

const screenWidth = Dimensions.get('window').width;

interface SolicitationCardProps {
  solicitationData: SolicitationResponseInterface;
}

const UpdateSolicitationStatusForm = ({ solicitationData }: SolicitationCardProps) => {
  const router = useRouter();
  const [isCameraModalVisible, setIsCameraModalVisible] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [hasImage, setHasImage] = useState(false);

  const showModal = () => setIsCameraModalVisible(true);
  const hideModal = () => setIsCameraModalVisible(false);

  const handleTakePicture = (uri: string, setFieldValue: (field: string, value: any) => void) => {
    setFieldValue('image', uri);
    setHasImage(true)
    hideModal();
  };

  const confirmRemoveImage = (setFieldValue: (field: string, value: any) => void) => {
    Alert.alert(
      'Remover Imagem',
      'Deseja remover esta imagem?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          onPress: () => handleRemoveImage(setFieldValue)
        },
      ],
    );
  };

  const handleRemoveImage = (setFieldValue: (field: string, value: any) => void) => {
    setFieldValue('image', null);
    setHasImage(false);
  }

  const handleUpdateStatus = async (id: number, data: UpdateSolicitationStatusDataInterface) => {
    await updateSolicitationStatus(id, data)
      .then(async (response) => {
        if (response) {
          router.push('/auth');

          successToast({ title: 'Status atualizado com sucesso!' });

          const userSolicitationId = response.id;
          await handleUserSolicitationImage(userSolicitationId.toString(), data);
        }
      })
      .catch((error) => {
        if (error?.response?.status === 422) {
          errorToast({ title: 'Não é possível atualizar solicitações resolvidas!' });
        } else {
          errorToast({ title: 'Ocorreu um erro ao atualizar o status!' });
        }
      });
  };

  const handleUserSolicitationImage = async (userSolicitationId: string, data: UpdateSolicitationStatusDataInterface) => {
    if (data.image != null) {
      await addUserSolicitationImage(
        data.image,
        userSolicitationId,
      ).then(() => {
        successToast({ title: 'Imagem de atualização de status enviada com sucesso!' });
      }).catch((error: any) => {
        errorToast({ title: 'Ocorreu um erro ao enviar a imagem de atualização de status!' });
        throw error;
      });
    }
  };

  return (
    <>
      {! hasImage && (
        <CameraButton onPress={showModal} />
      )}

      <View style={[styles.container, !hasImage && styles.noImage]}>
        <View style={styles.pageHeader}>
          <Entypo name="cycle" size={100} color="black" />
          <Text variant={'titleLarge'}>              Atualização de Status              </Text>
        </View>

        <Formik
          initialValues={{
            status: null,
            image: null,
          }}
          validationSchema={UpdateSolicitationStatusValidation}
          onSubmit={(values: UpdateSolicitationStatusDataInterface) => {
            setSubmitting(true);
            handleUpdateStatus(solicitationData.id, values);
            setSubmitting(false);
          }}
        >
          {({ handleSubmit, values, setFieldValue, errors, touched }) => (
            <View style={styles.form}>
              <Picker
                style={styles.picker}
                selectedValue={values.status}
                onValueChange={(itemValue) => setFieldValue('status', itemValue)}
              >
                <Picker.Item label="Selecione o novo status*" value={null} />
                {statusOptions.map((status) => (
                  <Picker.Item
                    key={status.value}
                    label={getTranslatedSolicitationStatus(status.value)}
                    value={status.value}
                  />
                ))}
              </Picker>

              <View style={styles.statusError}>
                {(errors.status && touched.status) && <FormError errorMessage={errors.status} />}
              </View>

              <View style={styles.imageContainer}>
                {values.image ? (
                  <View>
                    <Text variant="titleMedium" style={styles.imageTitle}>
                      Foto para atualização:
                    </Text>
                    <Image source={{ uri: values.image }} style={styles.image} resizeMode="contain" />
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => confirmRemoveImage(setFieldValue)}
                    >
                      <MaterialCommunityIcons name="image-remove" size={24} color="red" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.centeredIcon}>
                    <MaterialCommunityIcons name="image-off" size={200} color="black" />
                  </View>
                )}
                {(errors.image && touched.image) && <FormError errorMessage={errors.image} />}
              </View>

              <Button
                mode="contained"
                onPress={(e: any) => handleSubmit(e)}
                loading={isSubmitting}
                disabled={isSubmitting}
                style={styles.submitButton}
              >
                Atualizar Status
              </Button>

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
                  <MyCamera onTakePicture={(uri: string) => handleTakePicture(uri, setFieldValue)} />
                </View>
              </Modal>

            </View>
          )}
        </Formik>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    marginTop: '15%',
    marginBottom: '5%',
  },
  form: {
    width: '85%',
    flex: 1,
    justifyContent: 'flex-end'
  },
  picker: {
    height: 50,
    width: '100%',
    marginTop: 10,
    backgroundColor: '#ebdceb',
  },
  pageHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
  },
  imageTitle: {
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 5
  },
  image: {
    width: screenWidth,
    height: screenWidth,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  submitButton: {
    marginTop: 20,
    justifyContent: 'flex-end'
  },
  centeredIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  statusError: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImage: {
    paddingTop: '20%',
    paddingBottom: '25%',
  }
});

export default UpdateSolicitationStatusForm;