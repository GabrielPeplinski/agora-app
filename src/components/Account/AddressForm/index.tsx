import { Formik } from 'formik';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@/src/components/Themed';

import { Button, TextInput, Text } from 'react-native-paper';
import { Alert } from 'react-native';

const AddressForm = (props: AddressInterface) => {
  const [ isDisabled, setIdDisabled] = useState(true)
  const handleRegister = async (values: any) => {
    try {
      console.log(values);

    } catch (error: any) {
      Alert.alert('Ocorreu um erro ao realizar seu cadastro!');
    }
  };

  return (
    <View style={styles.container}>
      <>
        <Formik
          initialValues={{
            zipCode: props.zipCode,
            cityName: props.cityName,
            neighborhood: props.neighborhood,
            stateAbbreviation: props.stateAbbreviation,
          }}
          // validationSchema={RegisterValidation}
          onSubmit={(values) => handleRegister(values)}
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

              <TextInput
                style={styles.space}
                label="Cidade"
                placeholder="Cidade onde mora"
                value={values.cityName}
                secureTextEntry={true}
                onChangeText={handleChange('cityName')}
                disabled={isDisabled}
              />
              {errors.cityName && <Text>{errors.cityName}</Text>}

              <TextInput
                style={styles.space}
                label="Bairro"
                placeholder="Bairro onde mora"
                value={values.neighborhood}
                onChangeText={handleChange('neighborhood')}
                disabled={isDisabled}
              />
              {errors.cityName && <Text>{errors.cityName}</Text>}

              <TextInput
                style={styles.space}
                label="Estado"
                placeholder="Estado onde mora"
                value={values.stateAbbreviation}
                secureTextEntry={true}
                onChangeText={handleChange('stateAbbreviation')}
              />
              {errors.stateAbbreviation && <Text>{errors.stateAbbreviation}</Text>}

              <Button  style={styles.space} onPress={(e: any) => handleSubmit(e)} mode={'contained'}>
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
    marginTop: 10
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  form: {
    width: '80%',
  },
});

export default AddressForm;
