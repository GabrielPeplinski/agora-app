import React, { useEffect } from 'react';
import { View } from '@/components/Themed';
import { Formik } from 'formik';
import { Button, Text, TextInput } from 'react-native-paper';
import CepService from '@/services/CepPromiseService';

const AddressForm = () => {
  useEffect(() => {
    const handleSubmit = async () => {
      try {
        const aqui = await CepService.searchCep('85040370');
        console.log(aqui);
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      }
    };

    handleSubmit();
  }, []); // O segundo argumento [] faz com que o useEffect seja executado apenas uma vez, equivalente a componentDidMount

  return (
    <View>
      {/* Conteúdo do seu formulário aqui */}
    </View>
  );
};

export default AddressForm;
