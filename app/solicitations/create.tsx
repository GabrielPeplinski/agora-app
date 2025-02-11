import React, { useEffect, useState } from 'react';
import { View } from '@/src/components/Themed';
import { Button } from 'react-native-paper';
import ContainerBaseStyle from '@/app/style';
import { StyleSheet } from 'react-native';
import FirstPageSolicitationForm from '@/src/components/Solicitation/FirstPageSolicitationForm';
import SecondPageCreateSolicitationForm from '@/src/components/Solicitation/SecondPageCreateSolicitationForm';
import { addSolicitationImage } from '@/src/services/api/Solicitation/AddSolicitationImageService';
import { createSolicitation } from '@/src/services/api/Solicitation/MySolicitationsService';
import { errorToast, successToast } from '@/utils/use-toast';
import LoadingScreen from '@/src/components/Shared/LoadingScreen';
import { useRouter } from 'expo-router';
import { useRefreshContext } from '@/src/context/RefreshContextProvider';
import CreateSolicitationFormDataInterface
  from '@/src/interfaces/Solicitation/Form/CreateSolicitationFormDataInterface';
import GoBackButton from '@/src/components/Shared/GoBackButton';

export default function CreateSolicitationsScreen() {
  const [page, setPage] = useState(0);
  const maxPageNumber = 2;
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const router = useRouter();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { setNeedRefresh } = useRefreshContext();

  const [formData, setFormData] = useState<CreateSolicitationFormDataInterface>({
    title: '',
    description: '',
    solicitationCategoryId: 0,
    latitudeCoordinates: '',
    longitudeCoordinates: '',
    coverImage: '',
    images: [],
  });

  useEffect(() => {
    if (page === 0) {
      setIsButtonDisabled(!validateFirstPage(formData));
    }

    if (page === 1) {
      setIsButtonDisabled(!validateSecondPage(formData));
    }
  }, [formData, page]);

  function validateFirstPage(formData: CreateSolicitationFormDataInterface) {
    return formData.title !== '' &&
      formData.description !== '' &&
      formData.solicitationCategoryId !== 0 &&
      formData.latitudeCoordinates !== '' &&
      formData.longitudeCoordinates !== '' &&
      formData.title.length >= 5 &&
      formData.title.length <= 255 &&
      formData.description.length >= 5 &&
      formData.description.length <= 1000;
  }

  function validateSecondPage(formData: CreateSolicitationFormDataInterface) {
    return formData.coverImage !== null && formData.coverImage !== '';
  }

  function handleSubmit() {
    if (page < maxPageNumber - 1) {
      setPage(page + 1);
    } else {
      setLoadingSubmit(true);
      handleCreateSolicitation()
        .finally(() => setLoadingSubmit(false));
    }
  }

  async function handleCreateSolicitation() {
    await createSolicitation(formData)
      .then((response) => {
        successToast({ title: 'Solicitação criada com sucesso!' });

        router.back();
        setNeedRefresh();

        addSolicitationImages(response.id.toString());
      })
      .then(() => {
        successToast({ title: 'As imagens foram enviadas com sucesso!' });
      })
      .catch((error: any) => {
        console.error(error);
        errorToast({ title: 'Ocorreu algum erro durante a criação da solicitação!' });
      });
  }

  async function addSolicitationImages(mySolicitationId: string) {
    if (formData.coverImage != null) {
      await addSolicitationImage(formData.coverImage, mySolicitationId)
        .catch((error: any) => {
          throw error;
        });
    }

    if (formData.images.length > 0) {
      for (const image of formData.images) {
        await addSolicitationImage(image, mySolicitationId)
          .catch((error: any) => {
            throw error;
          });
      }
    }
  }

  function handleBack() {
    if (page > 0) {
      setPage(page - 1);
    }
  }

  const pages = [
    <FirstPageSolicitationForm values={formData} setValues={setFormData} />,
    <SecondPageCreateSolicitationForm values={formData} setValues={setFormData} />
  ];

  return (
    <View style={ContainerBaseStyle.container}>
      <GoBackButton/>

      {loadingSubmit ? <LoadingScreen /> : (
        <>
          {pages[page] || pages[0]}

          <View style={styles.buttonContainer}>
            {page > 0 && (
              <Button
                mode={'contained'}
                onPress={handleBack}
                style={styles.buttonBack}
              >
                Voltar
              </Button>
            )}
            <Button
              mode={'contained'}
              onPress={handleSubmit}
              style={styles.buttonNext}
              disabled={isButtonDisabled}
            >
              {page === 0 ? 'Próximo' : 'Cadastrar'}
            </Button>
          </View>
        </>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  buttonNext: {
    marginTop: 10,
  },
  buttonBack: {
    marginTop: 10,
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
});
