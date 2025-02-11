import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { TextInputMask } from 'react-native-masked-text';
import { Entypo } from '@expo/vector-icons';
import AddressValidation from '@/src/validations/AddressValidation';
import { createOrUpdateAddress, getAddress } from '@/src/services/api/AddressService';
import { errorToast, successToast } from '@/utils/use-toast';
import { useRouter } from 'expo-router';
import { searchCep } from '@/src/services/api/ViaCepService';
import FormError from '@/src/components/Shared/FormError';
import FormErrorsInterface from '@/src/interfaces/Forms/FormErrorsInterface';

interface AddressInterface {
  zipCode: string;
  cityName: string;
  neighborhood: string;
  stateAbbreviation: string;
}

interface StatesInterface {
  label: string;
  value: string;
}

const states: StatesInterface[] = [
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
  const [address, setAddress] = useState<AddressInterface>({
    zipCode: '',
    cityName: '',
    neighborhood: '',
    stateAbbreviation: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrorsInterface>({});
  const [loading, setLoading] = useState(false);
  const [showFields, setShowFields] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getAddress()
      .then((response) => {
        if (response) {
          setAddress({
            zipCode: response.zipCode,
            cityName: response.cityName,
            neighborhood: response.neighborhood,
            stateAbbreviation: response.stateAbbreviation,
          });
          setShowFields(true);
        } else {
          setShowFields(false);
        }
      })
      .catch(() => {
        setShowFields(false);
      });
  }, []);

  const cleanErrors = () => setFormErrors({});

  const handleZipCodeChange = async (cep: string, setFieldValue: any) => {
    const cleanCep = cep.replace('-', '').trim();
    setFieldValue('zipCode', cep);

    if (cleanCep.length === 8) {
      setLoading(true);

      await searchCep(cleanCep)
        .then((data) => {
          if (data) {
            setFieldValue('cityName', data.cityName || '');
            setFieldValue('neighborhood', data.neighborhood || '');
            setFieldValue('stateAbbreviation', data.stateAbbr || '');
            setAddress({
              zipCode: cep,
              cityName: data.cityName || '',
              neighborhood: data.neighborhood || '',
              stateAbbreviation: data.stateAbbr || '',
            });
            setShowFields(true);
          }
        })
        .catch(() => {
          errorToast({ title: 'CEP inválido ou não encontrado.' });
          setFieldValue('cityName', '');
          setFieldValue('neighborhood', '');
          setFieldValue('stateAbbreviation', '');
          setShowFields(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleRegister = async (values: AddressInterface) => {
    const formattedValues = {
      ...values,
      zipCode: values.zipCode.replace('-', ''),
    };

    await createOrUpdateAddress(formattedValues)
      .then(() => {
        cleanErrors();
        successToast({ title: 'Endereço atualizado com sucesso!' });
        router.push('/auth');
      })
      .catch((error: any) => {
        if (error?.response?.status === 422) {
          setFormErrors(error?.response?.data?.errors || {});
        } else {
          errorToast({ title: 'Erro desconhecido ao atualizar endereço.' });
        }
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.pageHeader}>
        <Entypo name="home" size={100} color="black" />
        <Text variant="titleLarge">Atualize seu Endereço</Text>
      </View>

      <Formik
        initialValues={address}
        validationSchema={AddressValidation}
        enableReinitialize
        onSubmit={(values) => handleRegister(values)}
      >
        {({ handleChange, handleSubmit, setFieldValue, values, errors, touched }) => (
          <View style={styles.form}>
            <TextInputMask
              type="custom"
              options={{ mask: '99999-999' }}
              customTextInput={TextInput}
              customTextInputProps={{
                style: styles.space,
                label: 'CEP*',
                placeholder: 'Digite o CEP',
              }}
              value={values.zipCode}
              onChangeText={(text) => handleZipCodeChange(text, setFieldValue)}
            />
            {(errors.zipCode && touched.zipCode) && <FormError errorMessage={errors.zipCode} />}
            {formErrors.zipCode && <FormError errorMessage={formErrors.zipCode[0]} />}

            {loading && <ActivityIndicator style={styles.loading} size="small" color="#004aad" />}

            {showFields && (
              <>
                <TextInput
                  style={styles.space}
                  label="Cidade*"
                  value={values.cityName}
                  onChangeText={handleChange('cityName')}
                />
                <TextInput
                  style={styles.space}
                  label="Bairro*"
                  value={values.neighborhood}
                  onChangeText={handleChange('neighborhood')}
                />
                <Picker
                  selectedValue={values.stateAbbreviation}
                  style={styles.picker}
                  onValueChange={(value) => setFieldValue('stateAbbreviation', value)}
                >
                  <Picker.Item label="Selecione o estado*" value="" />
                  {states.map((state) => (
                    <Picker.Item key={state.value} label={state.label} value={state.value} />
                  ))}
                </Picker>
                <Button style={styles.space} onPress={(e: any) => handleSubmit(e)} mode="contained">
                  Atualizar Endereço
                </Button>
              </>
            )}
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
    backgroundColor: '#ebdceb',
  },
  pageHeader: {
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  loading: {
    marginTop: 10,
  },
});

export default AddressForm;
