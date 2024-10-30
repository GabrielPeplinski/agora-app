import React, { useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Image, ScrollView, Dimensions, Alert } from 'react-native';
import { Formik } from 'formik';
import { Button, Text } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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

  const showModal = () => setIsCameraModalVisible(true);
  const hideModal = () => setIsCameraModalVisible(false);

  const handleTakePicture = (uri: string, setFieldValue: (field: string, value: any) => void) => {
    setFieldValue('image', uri);
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
          onPress: () => setFieldValue('image', null),
        },
      ],
    );
  };

  const handleUpdateStatus = async (id: number, data: UpdateSolicitationStatusDataInterface) => {
    await updateSolicitationStatus(id, data)
      .then(async (response) => {
        if (response) {
          successToast({ title: 'Status atualizado com sucesso!' });
          const userSolicitationId = response.id;

          await handleUserSolicitationImage(userSolicitationId.toString(), data);

          router.push('/auth');
        }
      })
      .catch((error) => {
        console.log(error)
        if (error?.response?.status === 422) {
          errorToast({ title: 'Não é possível atualizar solicitações que já estão resolvidas!' });
        } else {
          errorToast({ title: 'Ocorreu um erro ao atualizar o status!' });
        }
      });
  };

  const handleUserSolicitationImage = async (userSolicitationId: string, data: UpdateSolicitationStatusDataInterface) => {
    await addUserSolicitationImage(
      data.image ?? '',
      'Update solicitation status:' + userSolicitationId,
      userSolicitationId,
    ).then(() => {
      successToast({ title: 'Imagem de atualização de status enviada com sucesso!' });
    }).catch((error: any) => {
      errorToast({ title: 'Ocorreu um erro ao enviar a imagem de atualização de status!' });
      throw error;
    });
  };

  return (
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
      {({ handleChange, handleSubmit, values, setFieldValue, errors, touched }) => (
        <ScrollView>
          <View style={styles.container}>
            <Text variant="titleLarge" style={styles.title}>
              Atualização de Status
            </Text>

            <Picker
              selectedValue={values.status}
              onValueChange={(itemValue) => setFieldValue('status', itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Selecione o status atual" value={null} />
              {statusOptions.map((status) => (
                <Picker.Item
                  key={status.value}
                  label={getTranslatedSolicitationStatus(status.value)}
                  value={status.value}
                />
              ))}
            </Picker>
            {(errors.status && touched.status) && <FormError errorMessage={errors.status} />}

            <View style={styles.imageContainer}>
              <Text variant="titleMedium" style={styles.centeredText}>
                Foto
              </Text>
              {!values.image ? (
                <View style={styles.centeredIcon}>
                  <Image
                    style={styles.image}
                    source={require('../../../../assets/images/no-image.png')}
                    resizeMode="cover"
                  />
                </View>
              ) : (
                <View style={styles.imageWrapper}>
                  <Image source={{ uri: values.image }} style={styles.image} resizeMode="contain" />
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => confirmRemoveImage(setFieldValue)}
                  >
                    <MaterialCommunityIcons name="image-remove" size={24} color="red" />
                  </TouchableOpacity>
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

            <Modal visible={isCameraModalVisible} onDismiss={hideModal}>
              <View>
                <TouchableOpacity style={styles.closeButton} onPress={hideModal}>
                  <MaterialCommunityIcons name="close-circle" size={30} color="red" />
                </TouchableOpacity>
                <MyCamera onTakePicture={(uri: string) => handleTakePicture(uri, setFieldValue)} />
              </View>
            </Modal>
            <CameraButton onPress={showModal} />
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  picker: {
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
  },
  centeredText: {
    textAlign: 'center',
  },
  centeredIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    position: 'relative',
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
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default UpdateSolicitationStatusForm;