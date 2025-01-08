import React, { useState } from 'react';
import { Formik } from 'formik';
import { Button, TextInput, Text, Switch } from 'react-native-paper';
import { Image, StyleSheet, View } from 'react-native';
import LoginValidation from '@/src/validations/LoginValidation';
import PasswordInput from '@/src/components/Account/PasswordInput';
import { useAuthStore } from '@/src/stores/authStore';
import FormError from '@/src/components/Shared/FormError';

const LoginForm = () => {
  const [keepSession, setKeepSession] = useState(false);
  const login = useAuthStore(state => state.login);

  const onToggleSwitch = () => setKeepSession(!keepSession);

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('../../../../assets/images/agora-logo.png')}
          style={styles.logoImage}
        />
      </View>
      <Formik
        enableReinitialize
        initialValues={{
          email: '',
          password: '',
          keepSession: false,
        }}
        validationSchema={LoginValidation}
        onSubmit={(values) => login(values)}
      >
        {({ handleChange, handleSubmit, values, errors, touched, isValid, setFieldValue }) => (
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

            {/*<View style={styles.switchContainer}>*/}
            {/*  <Switch*/}
            {/*    value={values.keepSession}*/}
            {/*    onValueChange={(value: boolean) => {*/}
            {/*      setFieldValue('keepSession', value);*/}
            {/*    }}*/}
            {/*    color={'black'}*/}
            {/*  />*/}

            {/*  <Text*/}
            {/*    style={styles.switchLabel}*/}
            {/*    variant={'bodyMedium'}>*/}
            {/*    {values.keepSession ? 'Manter sessão ativa' : 'Sessão expira após o login'}*/}
            {/*  </Text>*/}
            {/*</View>*/}

            <Button
              style={styles.button}
              labelStyle={styles.buttonText}
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
    marginTop: 10,
  },
  container: {
    backgroundColor: '#004aad',
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  switchLabel: {
    marginLeft: 10,
    color: 'white',
  },
  button: {
    marginTop: 10,
    backgroundColor: 'white',
  },
  buttonText: {
    color: 'black',
  },
  logoImage: {
    width: 350,
    height: 200,
  },
});

export default LoginForm;
