import React from 'react';
import { View } from '@/components/Themed';
import { Formik } from 'formik';
import { Button, Text, TextInput } from 'react-native-paper';
import { Alert, StyleSheet } from 'react-native';
import zipCodeValidation from '@/validations/ZipCodeValidation';
import CepPromiseService from '@/services/CepPromiseService';

const ZipCodeForm = () => {
  async function handleZipCodeSearch(zipCode: string) {
    try {
      const response = await CepPromiseService.searchCep(zipCode);
      console.log(response);
    } catch (error: any) {
      console.log(error);
      Alert.alert('Ocorreu um erro ao realizar a busca pelo CEP!');
    }
  }

  return (
    <View style={styles.container}>
      <>
        <Formik
          initialValues={{
            zipCode: '',
          }}
          validationSchema={zipCodeValidation}
          onSubmit={(values) => handleZipCodeSearch(values.zipCode)}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <View style={styles.form}>
              <TextInput
                style={styles.space}
                label="CEP"
                placeholder="Seu cep"
                value={values.zipCode}
                onChangeText={handleChange('zipCode')}
              />
              {errors.zipCode && <Text>{errors.zipCode}</Text>}

              <Button style={styles.space} onPress={(e: any) => handleSubmit(e)} mode={'contained'}>
                Criar
              </Button>
            </View>
          )}
        </Formik>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  space: {
    marginTop: 10,
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  form: {
    width: '80%',
  },
});


export default ZipCodeForm;