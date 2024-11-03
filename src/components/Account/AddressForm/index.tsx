import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import AddressValidation from '@/src/validations/AddressValidation';
import { createOrUpdateAddress, getAddress } from '@/src/services/api/AddressService';
import { errorToast, successToast } from '@/utils/use-toast';
import { TextInputMask } from 'react-native-masked-text';
import FormErrorsInterface from '@/src/interfaces/Forms/FormErrorsInterface';
import { Entypo } from '@expo/vector-icons';
import FormError from '@/src/components/Shared/FormError';
import { useRouter } from 'expo-router';

interface StatesData {
  label: string;
  value: string;
}

const states: StatesData[] = [
  { label: 'Acre', value: 'AC' },
  { label: 'Alagoas', value: 'AL' },
  { label: 'Amapá', value: 'AP' },
  { label: 'Amazonas', value: 'AM' },
  { label: 'Bahia', value: 'BA' },
  { label: 'Ceará', value: 'CE' },
  { label: 'Distrito Federal', value: 'DF' },
  { label: 'Espírito Santo', value: 'ES' },
  { label: 'Goiás', value: 'GO' },
  { label: 'Maranhão', value: 'MA' },
  { label: 'Mato Grosso', value: 'MT' },
  { label: 'Mato Grosso do Sul', value: 'MS' },
  { label: 'Minas Gerais', value: 'MG' },
  { label: 'Pará', value: 'PA' },
  { label: 'Paraíba', value: 'PB' },
  { label: 'Paraná', value: 'PR' },
  { label: 'Pernambuco', value: 'PE' },
  { label: 'Piauí', value: 'PI' },
  { label: 'Rio de Janeiro', value: 'RJ' },
  { label: 'Rio Grande do Norte', value: 'RN' },
  { label: 'Rio Grande do Sul', value: 'RS' },
  { label: 'Rondônia', value: 'RO' },
  { label: 'Roraima', value: 'RR' },
  { label: 'Santa Catarina', value: 'SC' },
  { label: 'São Paulo', value: 'SP' },
  { label: 'Sergipe', value: 'SE' },
  { label: 'Tocantins', value: 'TO' },
];

const AddressForm = () => {
  const [initialValues, setInitialValues] = useState({
    zipCode: '',
    cityName: '',
    neighborhood: '',
    stateAbbreviation: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrorsInterface>({});
  const router = useRouter();

  const cleanErrors = () => {
    setFormErrors({});
  };

  useEffect(() => {
    const fetchAddress = async () => {
      const addressData = await getAddress();

      if (addressData) {
        setInitialValues({
          zipCode: addressData.zipCode || '',
          cityName: addressData.cityName || '',
          neighborhood: addressData.neighborhood || '',
          stateAbbreviation: addressData.stateAbbreviation || '',
        });
      }
    };
    fetchAddress();
  }, []);

  const handleRegister = async (values: AddressInterface) => {
    const formattedValues = {
      ...values,
      zipCode: values.zipCode.replace('-', ''),
    };

    await createOrUpdateAddress(formattedValues)
      .then(() => {
        cleanErrors();
        router.push('/auth');
        successToast({ title: 'Endereço atualizado com sucesso!' });
      })
      .catch((error) => {
        if (error?.response?.status === 422) {
          setFormErrors(error?.response?.data?.errors || {});
          errorToast({ title: 'Ocorreu um erro ao atualizar seu endereço!' });
        } else {
          errorToast({ title: 'Ocorreu um erro ao atualizar seu endereço!' });
        }
      });
  };

  return (
    <View style={styles.container}>

      <View style={styles.pageHeader}>
        <Entypo name="home" size={100} color="black" />
        <Text variant={'titleLarge'}>
          Atualize seu Endereço
        </Text>
      </View>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={AddressValidation}
        onSubmit={(values: AddressInterface) => handleRegister(values)}
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

            <Picker
              selectedValue={values.stateAbbreviation}
              style={styles.picker}
              onValueChange={(itemValue) => {
                setFieldValue('stateAbbreviation', itemValue);
                setFormErrors((prevErrors) => {
                  const { stateAbbreviation, ...rest } = prevErrors;
                  return rest;
                });
              }}
            >
              <Picker.Item label="Selecione o estado*" value="" />
              {states.map((state) => (
                <Picker.Item key={state.value} label={state.label} value={state.value} />
              ))}
            </Picker>
            {(errors.stateAbbreviation && touched.stateAbbreviation) && <FormError errorMessage={errors.stateAbbreviation} />}
            {formErrors.stateAbbreviation && formErrors.stateAbbreviation.length > 0 && <FormError errorMessage={formErrors.stateAbbreviation[0]} />}

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
    backgroundColor: '#ebdceb'
  },
  pageHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  }
});

export default AddressForm;
