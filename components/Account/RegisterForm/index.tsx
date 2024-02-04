import { View } from '@/components/Themed';
import UserPropsInterface from '@/interfaces/UserPropsInterface';
import RegisterValidation from '@/validations/RegisterValidation';
import { Formik } from 'formik';
import React from 'react';
import { StyleSheet } from 'react-native';

import { Button, TextInput, Text } from 'react-native-paper';
import AuthService from '@/services/api/AuthService';
import { Alert } from 'react-native';

const RegisterForm = () => {
  const authService = new AuthService();

	const handleRegister = async (values: UserPropsInterface) => {
    try {
      console.log(values);
      await authService.register(values);

    } catch (error: any) {
      Alert.alert('Ocorreu um erro ao realizar seu cadastro!');
    }
	};

  return (
    <View>
      <>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={RegisterValidation}
          onSubmit={(values) => handleRegister(values)}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <View>
              <TextInput
                style={styles.space}
                label="Nome"
                placeholder="Seu nome"
                value={values.name}
                onChangeText={handleChange('name')}
              />
              {errors.name && <Text>{errors.name}</Text>}

              <TextInput
                style={styles.space}
                label="Email"
                placeholder="Seu email"
                value={values.email}
                onChangeText={handleChange('email')}
              />
              {errors.email && <Text>{errors.email}</Text>}

              <TextInput
                style={styles.space}
                label="Senha"
                placeholder="Digite sua senha"
                value={values.password}
                secureTextEntry={true}
                onChangeText={handleChange('password')}
              />
              {errors.password && <Text>{errors.password}</Text>}

              <TextInput
                style={styles.space}
                label="Confirmação de Senha"
                placeholder="Digite a confirmação da senha"
                value={values.confirmPassword}
                secureTextEntry={true}
                onChangeText={handleChange('confirmPassword')}
              />
              {errors.confirmPassword && <Text>{errors.confirmPassword}</Text>}

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
  }
});

export default RegisterForm;
