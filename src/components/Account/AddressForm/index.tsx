import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import AddressValidation from '@/src/validations/AddressValidation';
import { createOrUpdateAddress } from '@/src/services/api/AddressService';
import { errorToast, successToast } from '@/utils/use-toast';

const states = [
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
  const handleRegister = async (values: AddressInterface) => {
    try {
      await createOrUpdateAddress(values);
      successToast({ title: 'Endereço atualizado com sucesso!' });
    } catch (error) {
      errorToast({title: 'Ocorreu um erro ao atualizar o endereço!'})
    }
  };

  const filteredStates = states.filter(state =>
    state.label.toLowerCase(),
  );

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          zipCode: '',
          cityName: '',
          neighborhood: '',
          stateAbbreviation: '',
        }}
        validationSchema={AddressValidation}
        onSubmit={(values) => handleRegister(values)}
      >
        {({ handleChange, handleSubmit, setFieldValue, values, errors }) => (
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
              onChangeText={handleChange('cityName')}
            />
            {errors.cityName && <Text>{errors.cityName}</Text>}

            <TextInput
              style={styles.space}
              label="Bairro"
              placeholder="Bairro onde mora"
              value={values.neighborhood}
              onChangeText={handleChange('neighborhood')}
            />
            {errors.neighborhood && <Text>{errors.neighborhood}</Text>}

            <Picker
              selectedValue={values.stateAbbreviation}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setFieldValue('stateAbbreviation', itemValue)
              }
            >
              <Picker.Item label="Selecione o estado" value="" />
              {filteredStates.map((state) => (
                <Picker.Item key={state.value} label={state.label} value={state.value} />
              ))}
            </Picker>
            {errors.stateAbbreviation && <Text>{errors.stateAbbreviation}</Text>}

            <Button style={styles.space} onPress={(e: any) => handleSubmit(e)} mode={'contained'}>
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
});

export default AddressForm;
