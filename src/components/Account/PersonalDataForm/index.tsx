import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput, Text, Checkbox } from 'react-native-paper';
import { errorToast, successToast } from '@/utils/use-toast';
import FormErrorsInterface from '@/src/interfaces/Forms/FormErrorsInterface';
import { FontAwesome5 } from '@expo/vector-icons';
import FormError from '@/src/components/Shared/FormError';
import { useRouter } from 'expo-router';
import { me, updatePersonalData } from '@/src/services/api/AuthService';
import PersonalDataValidation from '@/src/validations/PersonalDataValidation';
import PersonalDataInterface from '@/src/interfaces/Auth/PersonalDataInterface';

const PersonalDataForm = () => {
  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    password: '',
    new_password: '',
    new_password_confirmation: ''
  });
  const [formErrors, setFormErrors] = useState<FormErrorsInterface>({});
  const router = useRouter();
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const cleanErrors = () => {
    setFormErrors({});
  };

  useEffect(() => {
    const getPersonalData = async () => {
      const meData = await me();

      if (meData) {
        setInitialValues({
          name: meData.name,
          email: meData.email,
          password: '',
          new_password: '',
          new_password_confirmation: '',
        });
      }
    };
    getPersonalData();
  }, []);

  const handleUpdatePersonalData = async (values: PersonalDataInterface) => {
    const data = {
      ...values,
      new_password: values.new_password || '',
      new_password_confirmation: values.new_password_confirmation || '',
    }

    await updatePersonalData(data)
      .then(() => {
        cleanErrors();
        router.push('/auth');
        successToast({ title: 'Dados pessoais atualizado com sucesso!' });
      })
      .catch((error) => {
        if (error?.response?.status === 422) {
          setFormErrors(error?.response?.data?.errors || {});
          errorToast({ title: 'Ocorreu um erro ao atualizar seus dados pessoais!' });
        } else {
          errorToast({ title: 'Ocorreu um erro ao atualizar seus dados pessoais!' });
        }
      });
  };

  return (
    <View style={styles.container}>

      <View style={styles.pageHeader}>
        <FontAwesome5 name="user-alt" size={100} color="black" />
        <Text variant={'titleLarge'}>
          Dados Pessoais
        </Text>
      </View>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={PersonalDataValidation}
        onSubmit={(values: PersonalDataInterface) => handleUpdatePersonalData(values)}
      >
        {({ handleChange, handleSubmit, setFieldValue, values, errors, touched }) => (
          <View style={styles.form}>

            <TextInput
              style={styles.space}
              label="Nome*"
              placeholder="Seu nome..."
              value={values.name}
              onChangeText={handleChange('name')}
            />
            {(errors.name && touched.name) && <FormError errorMessage={errors.name} />}
            {formErrors.name && formErrors.name.length > 0 && <FormError errorMessage={formErrors.name[0]} />}

            <TextInput
              style={styles.space}
              label="Email*"
              placeholder="Seu email..."
              value={values.email}
              onChangeText={handleChange('email')}
            />
            {(errors.email && touched.email) && <FormError errorMessage={errors.email} />}
            {formErrors.email && formErrors.email.length > 0 && <FormError errorMessage={formErrors.email[0]} />}

            <Checkbox.Item
              label="Deseja atualizar sua senha?"
              status={isUpdatingPassword ? 'checked' : 'unchecked'}
              onPress={() => setIsUpdatingPassword(!isUpdatingPassword)}
            />

            {isUpdatingPassword && (
              <>
                <TextInput
                  style={styles.space}
                  label="Nova senha"
                  placeholder="Sua nova senha..."
                  value={values.new_password || ''}
                  onChangeText={handleChange('new_password')}
                />
                {(errors.new_password && touched.new_password) && <FormError errorMessage={errors.new_password} />}
                {formErrors.new_password && formErrors.new_password.length > 0 && <FormError errorMessage={formErrors.new_password[0]} />}

                <TextInput
                  style={styles.space}
                  label="Confirme sua nova senha"
                  placeholder="Confirmação da sua nova senha..."
                  value={values.new_password_confirmation || ''}
                  onChangeText={handleChange('new_password_confirmation')}
                />
                {(errors.new_password_confirmation && touched.new_password_confirmation) && <FormError errorMessage={errors.new_password_confirmation} />}
                {formErrors.new_password_confirmation && formErrors.new_password_confirmation.length > 0 && <FormError errorMessage={formErrors.new_password_confirmation[0]} />}
              </>
            )}

            <Button style={styles.space} onPress={(e: any) => handleSubmit(e)} mode="contained">
              Atualizar
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
  picker: {
    height: 50,
    width: '100%',
    marginTop: 10,
  },
  pageHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  }
});

export default PersonalDataForm;
