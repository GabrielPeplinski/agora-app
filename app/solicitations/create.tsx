import React from 'react';
import { View } from '@/src/components/Themed';
import { Button } from 'react-native-paper';
import ContainerBaseStyle from '@/app/style';
import { StyleSheet } from 'react-native';
import FirstPageCreateSolicitationForm from '@/src/components/Solicitation/FirstPageCreateSolicitationForm';
import SecondPageCreateSolicitationForm from '@/src/components/Solicitation/SecondPageCreateSolicitationForm';

export default function CreateSolicitationsScreen() {
  const [page, setPage] = React.useState(0);

  function handleSubmit() {
    setPage(page + 1);
  }

  function handleBack() {
    setPage(page - 1);
  }

  const conditionalComponent = () => {
    switch (page) {
      case 0:
        return <FirstPageCreateSolicitationForm />;
      case 1:
        return <SecondPageCreateSolicitationForm />;
      case 2:
        return <FirstPageCreateSolicitationForm />;
      default:
        return <FirstPageCreateSolicitationForm />;
    }
  };

  return (
    <View style={ContainerBaseStyle.container}>

      {conditionalComponent()}

      <View style={styles.buttonContainer}>
        {
          page > 0 &&
          <Button
            mode={'contained'}
            onPress={(e) => handleBack()}
            style={styles.buttonBack}
          >
            Voltar
          </Button>
        }
        <Button
          mode={'contained'}
          onPress={(e) => handleSubmit()}
          style={styles.buttonNext}
        >
          {page === 0 || page === 1 ? 'Próximo' : 'Cadastrar'}
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