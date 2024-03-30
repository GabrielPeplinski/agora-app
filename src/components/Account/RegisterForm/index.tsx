import UserPropsInterface from '@/src/interfaces/UserPropsInterface';
import RegisterValidation from '@/src/validations/RegisterValidation';
import { Formik } from 'formik';
import React from 'react';
import { StyleSheet } from 'react-native';

import { Button, TextInput, Text } from 'react-native-paper';
import { Alert } from 'react-native';
import { register } from '@/src/services/api/AuthService';
import { View } from '@/src/components/Themed';
import HttpStatusEnum from '@/src/enums/HttpStatusEnum';
import PasswordInput from '@/src/components/Account/PasswordInput';

const RegisterForm = () => {
	const handleRegister = async (values: UserPropsInterface) => {
    try {
      const response = await register(values);

      // @ts-ignore
      if (response.status === HttpStatusEnum.CREATED) {
      }

    } catch (error: any) {
      Alert.alert('Ocorreu um erro ao realizar seu cadastro!');
    }
	};

  return (
    <View style={styles.container}>
      <>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
          }}
          validationSchema={RegisterValidation}
          onSubmit={(values) => handleRegister(values)}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <View style={styles.form}>
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

              <PasswordInput
                label={"Senha"}
                value={values.password}
                placeholder={"Sua senha"}
                onChangeText={handleChange('password')}
              />
              {errors.password && <Text>{errors.password}</Text>}


              <PasswordInput
                label="Confirmação de Senha"
                value={values.password_confirmation}
                placeholder="Digite a confirmação da senha"
                onChangeText={handleChange('password_confirmation')}
              />
              {errors.password_confirmation && <Text>{errors.password_confirmation}</Text>}

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
  logoImage: {
    width: 350,
    height: 200,
  },
  text: {
    textAlign: 'center',
    color: 'white',
  },
});

export default RegisterForm;
