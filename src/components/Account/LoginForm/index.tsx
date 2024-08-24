import React from 'react';
import { Formik } from 'formik';
import { Button, TextInput } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import LoginValidation from '@/src/validations/LoginValidation';
import PasswordInput from '@/src/components/Account/PasswordInput';
import { useAuthStore } from '@/src/stores/authStore';
import FormError from '@/src/components/Shared/FormError';

const LoginForm = () => {
  const login = useAuthStore(state => state.login);

  return (
    <View style={styles.container}>
      <Formik
        enableReinitialize
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={LoginValidation}
        onSubmit={(values) => login(values)}
      >
        {({ handleChange, handleSubmit, values, errors, touched, isValid }) => (
          <View style={styles.form}>
            <TextInput
              style={styles.space}
              label="Email"
              placeholder="Seu email"
              value={values.email}
              onChangeText={handleChange('email')}
            />
            {(errors.email && touched.email) && <FormError errorMessage={errors.email} />}

            <PasswordInput
              label="Senha"
              value={values.password}
              placeholder="Sua senha"
              onChangeText={handleChange('password')}
            />
            {(errors.password && touched.password) && <FormError errorMessage={errors.password} />}

            <Button
              style={styles.space}
              onPress={(e: any) => handleSubmit(e)}
              mode="contained"
              disabled={!isValid}
            >
              Login
            </Button>
          </View>
        )}
      </Formik>
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
});

export default LoginForm;