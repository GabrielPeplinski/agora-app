import React from 'react';
import { Formik } from 'formik';
import { Button, Text, TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import LoginValidation from '@/src/validations/LoginValidation';
import { View } from '@/src/components/Themed';
import PasswordInput from '@/src/components/Account/PasswordInput';
import { useAuthStore } from '@/src/stores/authStore';

const LoginForm = () => {
  const login = useAuthStore(state => state.login);
  const handleLogin = async (values: any) => {
    try {
      login(values);
    } catch (error: any) {
      console.log(error.stack);
    }
  };

  return (
    <View style={styles.container}>
      <>
        <Formik
          initialValues={{
            email: 'example@example.com',
            password: '123456',
          }}
          validationSchema={LoginValidation}
          onSubmit={(values) => handleLogin(values)}
        >
          {({ handleChange, handleSubmit, values, errors, isValid }) => (
            <View style={styles.form}>
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

              <Button style={styles.space} onPress={(e: any) => handleSubmit(e)} mode={'contained'} disabled={!isValid}>
                Login
              </Button>

              <Text variant={'titleMedium'} style={{ textDecorationLine: 'line-through', textAlign: 'center' }}>
                Esqueceu sua senha?
              </Text>
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
    height: '100%',
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

export default LoginForm;