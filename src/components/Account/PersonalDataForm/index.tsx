import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import AddressValidation from '@/src/validations/AddressValidation';
import { createOrUpdateAddress } from '@/src/services/api/AddressService';
import { errorToast, successToast } from '@/utils/use-toast';
import { TextInputMask } from 'react-native-masked-text';
import FormErrorsInterface from '@/src/interfaces/Forms/FormErrorsInterface';
import { Entypo } from '@expo/vector-icons';
import FormError from '@/src/components/Shared/FormError';
import { useRouter } from 'expo-router';
import { me } from '@/src/services/api/AuthService';

const PersonalDataForm = () => {
  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    password: '',
    new_password: '',
    new_password_confirmation: ''
  });
  const [formErrors, setFormErrors] = useState<FormErrorsInterface>({});
  const router = useRouter();

  const cleanErrors = () => {
    setFormErrors({});
  };

  useEffect(() => {
    const fetchAddress = async () => {
      const meData = await me();

      if (meData) {
        setInitialValues({
          name: meData.name,
          email: meData.email
        });
      }
    };
    fetchAddress();
  }, []);

  const handleUpdatePersonalData = async (values: AddressInterface) => {
    const formattedValues = {
      ...values,
      zipCode: values.zipCode.replace('-', ''),
    };

    await createOrUpdateAddress(formattedValues)
      .then(() => {
        cleanErrors();
        router.push('/auth');
        successToast({ title: 'Dados pessoais atualizado com sucesso!' });
      })
      .catch((error) => {
        if (error?.response?.status === 422) {
          setFormErrors(error?.response?.data?.errors || {});
          errorToast({ title: 'Ocorreu um erro ao atualizar seus dados pessoais!' });
        } else {
          errorToast({ title: 'Ocorreu um erro ao atualizar seus dados pessoais!' });
        }
      });
  };

  return (
    <View style={styles.container}>

      <View style={styles.pageHeader}>
        <Entypo name="home" size={100} color="black" />
        <Text variant={'titleLarge'}>
          Atualize seu Dados Pessoais
        </Text>
      </View>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={AddressValidation}
        onSubmit={(values: AddressInterface) => handleUpdatePersonalData(values)}
      >
        {({ handleChange, handleSubmit, setFieldValue, values, errors, touched }) => (
          <View style={styles.form}>
            <TextInputMask
              type={'custom'}
              options={{
                mask: '99999-999',
              }}
              customTextInput={TextInput}
              customTextInputProps={{
                style: styles.space,
                label: 'CEP*',
                placeholder: 'Seu cep',
              }}
              value={values.zipCode}
              onChangeText={handleChange('zipCode')}
            />
            {(errors.zipCode && touched.zipCode) && <FormError errorMessage={errors.zipCode} />}
            {formErrors.zipCode && formErrors.zipCode.length > 0 && <FormError errorMessage={formErrors.zipCode[0]} />}

            <TextInput
              style={styles.space}
              label="Cidade*"
              placeholder="Cidade onde mora"
              value={values.cityName}
              onChangeText={handleChange('cityName')}
            />
            {(errors.cityName && touched.cityName) && <FormError errorMessage={errors.cityName} />}
            {formErrors.cityName && formErrors.cityName.length > 0 && <FormError errorMessage={formErrors.cityName[0]} />}

            <TextInput
              style={styles.space}
              label="Bairro*"
              placeholder="Bairro onde mora"
              value={values.neighborhood}
              onChangeText={handleChange('neighborhood')}
            />
            {(errors.neighborhood && touched.neighborhood) && <FormError errorMessage={errors.neighborhood} />}
            {formErrors.neighborhood && formErrors.neighborhood.length > 0 && <FormError errorMessage={formErrors.neighborhood[0]} />}

            <Button style={styles.space} onPress={(e: any) => handleSubmit(e)} mode="contained">
              Atualizar Endereço
            </Button>
          </View>
        )}
      </Formik>
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
  picker: {
    height: 50,
    width: '100%',
    marginTop: 10,
  },
  pageHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  }
});

export default PersonalDataForm;
