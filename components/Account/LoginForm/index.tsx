import React from 'react';
import { View } from '@/components/Themed';
import { Formik } from 'formik';
import { Button, Text, TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import LoginValidation from '@/validations/LoginValidation';
import SocialMediaOptionsBox from '@/components/Account/SocialMediaOptionsBox';

const LoginForm = () => {
  return (
    <View style={styles.container}>
      <>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginValidation}
          onSubmit={(values) => console.log(values)}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <View style={styles.form}>
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

              <Button style={styles.space} onPress={(e: any) => handleSubmit(e)} mode={'contained'}>
                Login
              </Button>

              <Text variant={'titleMedium'} style={{ textDecorationLine: 'line-through', textAlign: 'center' }}>
                Esqueceu sua senha?
              </Text>
            </View>
          )}
        </Formik>
      </>
      <SocialMediaOptionsBox
        facebookFunction={() => console.log("Função do Facebook clicada")}
        googleFunction={() => console.log("Função do Google clicada")}
        textContent="Ou faça login utilizando suas contas"
      />
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
  }
});

export default LoginForm;