import { View } from '@/components/Themed';
import UserPropsInterface from '@/interfaces/UserPropsInterface';
import RegisterValidation from '@/validations/RegisterValidation';
import { Formik } from 'formik';
import React from 'react';

import { Button, TextInput, Text } from 'react-native-paper';

const RegisterForm = () => {
	const handleRegister = async (values: UserPropsInterface) => {
		console.log(values);
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
                label="Nome"
                placeholder="Seu nome"
                value={values.name}
                onChangeText={handleChange('name')}
              />
              {errors.name && <Text>{errors.name}</Text>}

              <TextInput
                label="Email"
                placeholder="Seu email"
                value={values.email}
                onChangeText={handleChange('email')}
              />
              {errors.email && <Text>{errors.email}</Text>}

              <TextInput
                label="Senha"
                placeholder="Digite sua senha"
                value={values.password}
                secureTextEntry={true}
                onChangeText={handleChange('password')}
              />
              {errors.password && <Text>{errors.password}</Text>}

              <TextInput
                label="Confirmação de Senha"
                placeholder="Digite a confirmação da senha"
                value={values.confirmPassword}
                secureTextEntry={true}
                onChangeText={handleChange('confirmPassword')}
              />
              {errors.confirmPassword && <Text>{errors.confirmPassword}</Text>}

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

export default RegisterForm;
