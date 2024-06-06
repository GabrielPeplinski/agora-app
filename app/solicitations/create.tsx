import React from 'react';
import { View } from '@/src/components/Themed';
import { Button } from 'react-native-paper';
import ContainerBaseStyle from '@/app/style';
import { StyleSheet } from 'react-native';
import FirstPageCreateSolicitationForm from '@/src/components/Solicitation/FirstPageCreateSolicitationForm';
import SecondPageCreateSolicitationForm from '@/src/components/Solicitation/SecondPageCreateSolicitationForm';
import * as FileSystem from 'expo-file-system';
import { addSolicitationImage } from '@/src/services/api/Solicitation/AddSolicitationImageService';

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

  const [formData, setFormData] = React.useState<FormData>({
    title: '',
    description: '',
    solicitationCategoryId: 0,
    latitudeCoordinates: '',
    longitudeCoordinates: '',
    coverImage: '',
    images: []
  });

  async function handleSubmit() {
    if (page < maxPageNumber - 1) {
      setPage(page + 1);
    } else {
      if (formData.coverImage != null) {
        try {
          await addSolicitationImage(formData.coverImage, 'coverImage');
        } catch (error) {
          console.log('Erro ao enviar a imagem:', error);
        }
      }
      console.log('Dados do formulário:', formData);
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
