import React from 'react';
import { View } from '@/components/Themed';
import { Formik } from 'formik';
import { Button, Text, TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import LoginValidation from '@/validations/LoginValidation';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';

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
      <View style={styles.optionsView}>
        <Text variant={'titleMedium'}>
          Ou faça login utilizando suas redes sociais:
        </Text>
        <View style={styles.buttonsView}>
          <Button style={[styles.space, styles.buttonFacebook, styles.circularButton]} onPress={(e: any) => console.log(e)} mode={'contained'}>
            <FontAwesome5 name="facebook" size={20} color="black" />
          </Button>
          <Button style={[styles.space, styles.buttonGoogle, styles.circularButton]} onPress={(e: any) => console.log(e)} mode={'contained'}>
            <FontAwesome name="google" size={20} color="black" />
          </Button>
        </View>
      </View>
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
  optionsView: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonFacebook: {
    backgroundColor: '#3b5998',
  },
  buttonGoogle: {
    marginLeft: 10,
    backgroundColor: '#db4a39',
  },
  circularButton: {
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default LoginForm;