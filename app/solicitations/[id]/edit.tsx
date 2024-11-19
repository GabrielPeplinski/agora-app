import React, { useEffect, useState } from 'react';
import { View } from '@/src/components/Themed';
import { Button } from 'react-native-paper';
import ContainerBaseStyle from '@/app/style';
import { StyleSheet } from 'react-native';
import { addSolicitationImage } from '@/src/services/api/Solicitation/AddSolicitationImageService';
import { updateSolicitation } from '@/src/services/api/Solicitation/MySolicitationsService';
import { errorToast, successToast } from '@/utils/use-toast';
import LoadingScreen from '@/src/components/Shared/LoadingScreen';
import { useLocalSearchParams, useRouter } from 'expo-router';
import SolicitationResponseInterface from '@/src/interfaces/Solicitation/Responses/SolicitationResponseInterface';
import { getSolicitation } from '@/src/services/api/Solicitation/SolicitationsService';
import { useRefreshContext } from '@/src/context/RefreshContextProvider';
import SecondPageEditSolicitationForm from '@/src/components/Solicitation/SecondPageEditSolicitationForm';
import UpdateSolicitationFormDataInterface
  from '@/src/interfaces/Solicitation/Form/UpdateSolicitationFormDataInterface';
import FirstPageEditSolicitationForm from '@/src/components/Solicitation/FirstPageEditSolicitationForm';
import { removeSolicitationImages } from '@/src/services/api/Solicitation/RemoveSolicitationImageService';

export default function EditSolicitationScreen() {
  const [page, setPage] = useState(0);
  const maxPageNumber = 2;
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const router = useRouter();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { id } = useLocalSearchParams();
  const [solicitationData, setSolicitationData] = useState<SolicitationResponseInterface | null>(null);
  const { setNeedRefresh } = useRefreshContext();

  const [formData, setFormData] = useState<UpdateSolicitationFormDataInterface>({
    title: '',
    description: '',
    solicitationCategoryId: 0,
    latitudeCoordinates: '',
    longitudeCoordinates: '',
    coverImage: '',
    images: [],
    imagesToDelete: [],
    newImages: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      await getSolicitationDetails();
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (solicitationData) {
      setFormData({
        title: solicitationData.title || '',
        description: solicitationData.description || '',
        solicitationCategoryId: solicitationData.solicitationCategory?.id || 0,
        latitudeCoordinates: solicitationData.latitudeCoordinates || '',
        longitudeCoordinates: solicitationData.longitudeCoordinates || '',
        coverImage: solicitationData.coverImage || '',
        images: solicitationData.images || [],
        imagesToDelete: [],
        newImages: [],
      });
    }
  }, [solicitationData]);

  const getSolicitationDetails = async () => {
    await getSolicitation(id.toString())
      .then((response) => {
        if (response) {
          setSolicitationData(response);
        }
      })
      .catch((error: any) => {
        errorToast({ title: 'Ocorreu um erro ao buscar a solicitação!' });
      });
  };

  useEffect(() => {
    if (page === 0) {
      setIsButtonDisabled(!validateFirstPage(formData));
    }

    if (page === 1) {
      setIsButtonDisabled(!validateSecondPage(formData));
    }
  }, [formData, page]);

  function validateFirstPage(formData: UpdateSolicitationFormDataInterface) {
    return formData.title !== '' &&
      formData.description !== '' &&
      formData.solicitationCategoryId !== 0 &&
      formData.latitudeCoordinates !== '' &&
      formData.longitudeCoordinates !== '';
  }

  function validateSecondPage(formData: UpdateSolicitationFormDataInterface) {
    return formData.coverImage !== null && formData.coverImage !== '';
  }

  function handleSubmit() {
    if (page < maxPageNumber - 1) {
      setPage(page + 1);
    } else {
      setLoadingSubmit(true);
      handleUpdateSolicitation()
        .finally(() => setLoadingSubmit(false));
    }
  }

  async function handleUpdateSolicitation() {
    setLoadingSubmit(true);

    try {
      await updateSolicitation(id.toString(), formData);
      successToast({ title: 'Solicitação atualizada com sucesso!' });

      router.back();
      setNeedRefresh();

      handleUpdateSolicitationImages(id.toString(), formData.newImages, formData.imagesToDelete);
    } catch (error) {
      errorToast({ title: 'Ocorreu algum erro durante a atualização da solicitação!' });
    } finally {
      setLoadingSubmit(false);
    }
  }

  async function handleDeleteImages(solicitationId: string, imageUrls: string[]) {
    return removeSolicitationImages(solicitationId, { imageUrls });
  }

  async function handleAddNewSolicitationImages(solicitationId: string, newImages: string[]) {
    const addImagePromises = newImages.map((image) =>
      addSolicitationImage(image, solicitationId)
    );

    return Promise.all(addImagePromises);
  }

  async function handleUpdateSolicitationImages(
    solicitationId: string,
    newImages: string[] = [],
    imagesToDelete: string[] = []
  ) {
    try {
      let updatedImages = false;

      if (imagesToDelete.length > 0) {
        await handleDeleteImages(solicitationId, imagesToDelete);
        updatedImages = true;
      }

      if (newImages.length > 0) {
        await handleAddNewSolicitationImages(solicitationId, newImages);
        updatedImages = true;
      }

      if (updatedImages) {
        successToast({ title: 'As imagens foram atualizadas com sucesso!' });
      }
    } catch (error) {
      errorToast({ title: 'Ocorreu um erro ao atualizar as imagens da solicitação.' });
    }
  }

  function handleBack() {
    if (page > 0) {
      setPage(page - 1);
    }
  }

  const pages = [
    <FirstPageEditSolicitationForm values={formData} setValues={setFormData} />,
    <SecondPageEditSolicitationForm values={formData} setValues={setFormData} />,
  ];

  return (
    <View style={ContainerBaseStyle.container}>

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
              {page === 0 ? 'Próximo' : 'Atualizar'}
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
