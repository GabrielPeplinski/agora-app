import React, { useEffect, useState } from 'react';
import { View } from '@/src/components/Themed';
import { Button } from 'react-native-paper';
import ContainerBaseStyle from '@/app/style';
import { StyleSheet } from 'react-native';
import FirstPageSolicitationForm from '@/src/components/Solicitation/FirstPageSolicitationForm';
import { addSolicitationImage } from '@/src/services/api/Solicitation/AddSolicitationImageService';
import { updateSolicitation } from '@/src/services/api/Solicitation/MySolicitationsService';
import { errorToast, successToast } from '@/utils/use-toast';
import LoadingScreen from '@/src/components/Shared/LoadingScreen';
import { useLocalSearchParams, useRouter } from 'expo-router';
import SolicitationResponseInterface from '@/src/interfaces/Solicitation/Responses/SolicitationResponseInterface';
import { getSolicitation } from '@/src/services/api/Solicitation/SolicitationsService';
import { useRefreshContext } from '@/src/context/RefreshContextProvider';
import SecondPageEditSolicitationForm from '@/src/components/Solicitation/SecondPageEditSolicitationForm';

interface FormData {
  title: string;
  description: string;
  solicitationCategoryId: number;
  latitudeCoordinates: string;
  longitudeCoordinates: string;
  coverImage: string | null;
  images: string[];
}

export default function EditSolicitationScreen() {
  const [page, setPage] = React.useState(0);
  const maxPageNumber = 2;
  const [loadingSubmit, setLoadingSubmit] = React.useState(false);
  const router = useRouter();
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
  const { id } = useLocalSearchParams();
  const [solicitationData, setSolicitationData] = useState<SolicitationResponseInterface | null>(null);
  const { setNeedRefresh } = useRefreshContext();

  const [formData, setFormData] = React.useState<FormData>({
    title: '',
    description: '',
    solicitationCategoryId: 0,
    latitudeCoordinates: '',
    longitudeCoordinates: '',
    coverImage: '',
    images: [],
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
        coverImage: solicitationData.coverImage || null,
        images: solicitationData.images || [],
      });
    }
    console.log(solicitationData);
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

  function validateFirstPage(formData: FormData) {
    return formData.title !== '' &&
      formData.description !== '' &&
      formData.solicitationCategoryId !== 0 &&
      formData.latitudeCoordinates !== '' &&
      formData.longitudeCoordinates !== '';
  }

  function validateSecondPage(formData: FormData) {
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
    await updateSolicitation(id.toString(), formData)
      .then((response) => {
        successToast({ title: 'Solicitação atualizada com sucesso!' });

        router.back();
        setNeedRefresh();

        // addSolicitationImages(response.id.toString());
      })
      .then(() => {
        successToast({ title: 'As imagens foram enviadas com sucesso!' });
      })
      .catch((error: any) => {
        console.error(error);
        errorToast({ title: 'Ocorreu algum erro durante a atualização da solicitação!' });
      });

    console.log('Dados do formulário:', formData);
  }

  async function addSolicitationImages(mySolicitationId: string) {
    if (formData.coverImage != null) {
      await addSolicitationImage(formData.coverImage, 'coverImage', mySolicitationId)
        .catch((error: any) => {
          throw error;
        });
    }

    if (formData.images.length > 0) {
      for (const image of formData.images) {
        await addSolicitationImage(image, 'images', mySolicitationId)
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
    <SecondPageEditSolicitationForm values={formData} setValues={setFormData} />
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
