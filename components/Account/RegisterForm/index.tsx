import { View } from '@/components/Themed';
import UserPropsInterface from '@/interfaces/UserPropsInterface';
import RegisterValidation from '@/validations/RegisterValidation';
import { Formik } from 'formik';
import React from 'react';
import { StyleSheet } from 'react-native';

import { Button, TextInput, Text } from 'react-native-paper';
import { Alert } from 'react-native';

const RegisterForm = () => {
	const handleRegister = async (values: UserPropsInterface) => {
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
                value={values.password_confirmation}
                secureTextEntry={true}
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
