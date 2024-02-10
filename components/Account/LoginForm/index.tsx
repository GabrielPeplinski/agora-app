import React from 'react';
import { View } from '@/components/Themed';
import { Formik } from 'formik';
import { Button, Text, TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import LoginValidation from '@/validations/LoginValidation';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

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
            </View>
          )}
        </Formik>
      </>
      <View style={styles.optionsView}>
        <Button style={[styles.space, styles.buttonFacebook]} onPress={(e: any) => console.log(e)} mode={'contained'}>
          <Entypo name="facebook-with-circle" size={24} color="black" />
          Login
        </Button>
        <Button style={[styles.space, styles.buttonGoogle]} onPress={(e: any) => console.log(e)} mode={'contained'}>
          <FontAwesome name="google-plus-circle" size={24} color="black" />
          Login
        </Button>
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
    justifyContent: 'center'
  },
  buttonFacebook: {
    alignItems: 'center',
    backgroundColor: '#3b5998',
    width: '60%'
  },
  buttonGoogle: {
    alignItems: 'center',
    backgroundColor: '#db4a39',
    width: '60%'
  }
});

export default LoginForm;