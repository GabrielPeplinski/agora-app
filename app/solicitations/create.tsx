import React from 'react';
import { View } from '@/src/components/Themed';
import { Button } from 'react-native-paper';
import ContainerBaseStyle from '@/app/style';
import { StyleSheet } from 'react-native';
import FirstPageCreateSolicitationForm from '@/src/components/Solicitation/FirstPageCreateSolicitationForm';
import SecondPageCreateSolicitationForm from '@/src/components/Solicitation/SecondPageCreateSolicitationForm';
import { addSolicitationImage } from '@/src/services/api/Solicitation/AddSolicitationImageService';
import { createSolicitation } from '@/src/services/api/Solicitation/MySolicitationsService';
import { errorToast, successToast } from '@/utils/use-toast';
import LoadingScreen from '@/src/components/Shared/LoadingScreen';
import { useRouter } from 'expo-router';

interface FormData {
  title: string;
  description: string;
  solicitationCategoryId: number;
  latitudeCoordinates: string;
  longitudeCoordinates: string;
  coverImage: string | null;
  images: string[];
}

export default function CreateSolicitationsScreen() {
  const [page, setPage] = React.useState(0);
  const maxPageNumber = 2;
  const [loadingSubmit, setLoadingSubmit] = React.useState(false);
  const router = useRouter();

  const [formData, setFormData] = React.useState<FormData>({
    title: '',
    description: '',
    solicitationCategoryId: 0,
    latitudeCoordinates: '',
    longitudeCoordinates: '',
    coverImage: '',
    images: [],
  });

  function handleSubmit() {
    if (page < maxPageNumber - 1) {
      setPage(page + 1);
    } else {
      setLoadingSubmit(true);
      handleCreateSolicitation()
        .finally(() => setLoadingSubmit(false));

      router.back();
    }
  }

  async function handleCreateSolicitation() {
    await createSolicitation(formData)
      .then((response) => {
        successToast({ title: 'Solicitação criada com sucesso!' });

        return addSolicitationImages(response.id.toString());
      })
      .then(() => {
        successToast({ title: 'As imagens foram enviadas com sucesso!' });
      })
      .catch((error: any) => {
        console.error(error);
        errorToast({ title: 'Ocorreu algum erro durante a criação da solicitação!' });
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

  const conditionalComponent = () => {
    switch (page) {
      case 0:
        return (
          <FirstPageCreateSolicitationForm
            values={formData}
            setValues={setFormData}
          />
        );
      case 1:
        return (
          <SecondPageCreateSolicitationForm
            values={formData}
            setValues={setFormData}
          />
        );
      default:
        return (
          <FirstPageCreateSolicitationForm
            values={formData}
            setValues={setFormData}
          />
        );
    }
  };

  return (
    <View style={ContainerBaseStyle.container}>

      {loadingSubmit ? <LoadingScreen /> : (
        <>
          {conditionalComponent()}

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
