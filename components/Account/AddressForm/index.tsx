import React from 'react';
import { View } from '@/components/Themed';
import { Formik } from 'formik';
import { Button, Text, TextInput } from 'react-native-paper';
import { Alert } from 'react-native';
import CepService from '@/services/CepPromiseService';

interface AddressZipCodeInterface {
  zipCode: string
}

const AddressForm = () => {
  const handleCreateAddress = async (values: AddressZipCodeInterface) => {
    try {
      let data = await CepService.searchCep(values.zipCode);

      console.log(data)
    } catch (error: any) {
      Alert.alert('Ocorreu um erro ao cadastrar seu endereço!');
    }
  };

  return (
    <View>
      <>
        <Formik
          initialValues={{
            zipCode: '',
          }}
          onSubmit={(values) => handleCreateAddress(values)}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <View>
              <TextInput
                label="CEP"
                placeholder="Seu cep"
                value={values.zipCode}
                onChangeText={handleChange('zipCode')}
              />
              {errors.zipCode && <Text>{errors.zipCode}</Text>}

              <Button onPress={(e: any) => handleSubmit(e)}>
                Criar
              </Button>
            </View>
          )}
        </Formik>
      </>
    </View>
  );
};

export default AddressForm;
