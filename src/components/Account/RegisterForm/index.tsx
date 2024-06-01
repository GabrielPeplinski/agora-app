import UserPropsInterface from '@/src/interfaces/Auth/UserPropsInterface';
import RegisterValidation from '@/src/validations/RegisterValidation';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { register } from '@/src/services/api/AuthService';
import { View } from '@/src/components/Themed';
import PasswordInput from '@/src/components/Account/PasswordInput';
import { useRouter } from 'expo-router';
import { errorToast, successToast } from '@/utils/use-toast';
import FormErrorsInterface from '@/src/interfaces/Forms/FormErrorsInterface';
import FormError from '@/src/components/Shared/FormError';

const RegisterForm = () => {
  const router = useRouter();
  const [formErrors, setFormErrors] = React.useState<FormErrorsInterface>({});

  useEffect(() => {
    console.log(formErrors);
  }, [formErrors]);

  const cleanErrors = () => {
    setFormErrors({});
  }

  const handleRegister = async (values: UserPropsInterface) => {
    await register(values)
      .then(() => {
        router.push('/auth');
        successToast({ title: 'Seu usuário foi registrado com sucesso!' });
      })
      .catch((error) => {
        if (error?.response?.status === 422) {
          setFormErrors(error?.response?.data?.errors || {});
          errorToast({ title: 'Ocorreu um erro ao tentar registrar seu usuário!' });
        } else {
          errorToast({ title: 'Ocorreu um erro ao tentar registrar seu usuário!' });
        }
      });
  };

  return (
    <View style={styles.container}>
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
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <View style={styles.form}>
            <TextInput
              style={styles.space}
              label="Nome"
              placeholder="Seu nome"
              value={values.name}
              onChangeText={handleChange('name')}
            />
            {(errors.name && touched.name) && <FormError errorMessage={errors.name} />}
            {formErrors.name && formErrors.name.length > 0 && <FormError errorMessage={formErrors.name[0]} />}

            <TextInput
              style={styles.space}
              label="Email"
              placeholder="Seu email"
              value={values.email}
              onChangeText={handleChange('email')}
            />
            {(errors.email && touched.email) && <FormError errorMessage={errors.email} />}
            {formErrors.email && formErrors.email.length > 0 && <FormError errorMessage={formErrors.email[0]} />}

            <PasswordInput
              label={'Senha'}
              value={values.password}
              placeholder={'Sua senha'}
              onChangeText={handleChange('password')}
            />
            {(errors.password && touched.password) && <FormError errorMessage={errors.password} />}
            {formErrors.password && formErrors.password.length > 0 && <FormError errorMessage={formErrors.password[0]} />}

            <PasswordInput
              label="Confirmação de Senha"
              value={values.password_confirmation}
              placeholder="Digite a confirmação da senha"
              onChangeText={handleChange('password_confirmation')}
            />
            {(errors.password_confirmation && touched.password_confirmation) && <FormError errorMessage={errors.password_confirmation} />}
            {formErrors.password_confirmation && formErrors.password_confirmation.length > 0 && <FormError errorMessage={formErrors.password_confirmation[0]} />}

            <Button style={styles.space} onPress={(e: any) => handleSubmit(e)} mode={'contained'}>
              Criar
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
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default RegisterForm;
