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
import PasswordInput from '@/src/components/Account/PasswordInput';

const PersonalDataForm = () => {
  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    password: '',
    new_password: '',
    new_password_confirmation: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrorsInterface>({});
  const router = useRouter();
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const cleanErrors = () => {
    setFormErrors({});
  };

  const cleanFieldError = (field: keyof FormErrorsInterface) => {
    setFormErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  const validateForm = (values: PersonalDataInterface) => {
    const newErrors: FormErrorsInterface = {};

    if (isUpdatingPassword) {
      if (!values.new_password) {
        newErrors.new_password = ['Campo nova senha é obrigatório ao atualizar a senha atual'];
      }
      if (!values.new_password_confirmation) {
        newErrors.new_password_confirmation = ['Campo confirmação de nova senha é obrigatório ao atualizar a senha atual'];
      }
      if (values.new_password !== values.new_password_confirmation) {
        newErrors.new_password_confirmation = ['As senhas devem ser iguais'];
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return false;
    }
    return true;
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
  }, [isUpdatingPassword]);

  const handleUpdatePersonalData = async (values: PersonalDataInterface) => {
    const data: PersonalDataInterface = {
      name: values.name || '',
      email: values.email || '',
      password: values.password || '',
      new_password: values.new_password || '',
      new_password_confirmation: values.new_password_confirmation || '',
    };

    if (!values.new_password) {
      delete data.new_password;
      delete data.new_password_confirmation;
    }

    await updatePersonalData(data)
      .then(() => {
        cleanErrors();
        router.push('/auth');
        successToast({ title: 'Dados pessoais atualizados com sucesso!' });
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
        onSubmit={(values: PersonalDataInterface) => {
          if (validateForm(values)) {
            handleUpdatePersonalData(values);
          }
        }}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <View style={styles.form}>
            <TextInput
              style={styles.space}
              label="Nome*"
              placeholder="Seu nome..."
              value={values.name}
              onChangeText={(text) => {
                handleChange('name')(text);
                cleanFieldError('name');
              }}
            />
            {(errors.name && touched.name) && <FormError errorMessage={errors.name} />}
            {formErrors.name && formErrors.name.length > 0 && <FormError errorMessage={formErrors.name[0]} />}

            <TextInput
              style={styles.space}
              label="Email*"
              placeholder="Seu email..."
              value={values.email}
              onChangeText={(text) => {
                handleChange('email')(text);
                cleanFieldError('email');
              }}
            />
            {(errors.email && touched.email) && <FormError errorMessage={errors.email} />}
            {formErrors.email && formErrors.email.length > 0 && <FormError errorMessage={formErrors.email[0]} />}

            <PasswordInput
              label="Insira sua senha atual*"
              placeholder="Sua senha..."
              value={values.password}
              onChangeText={(text) => {
                handleChange('password')(text);
                cleanFieldError('password');
              }}
            />
            {(errors.password && touched.password) && <FormError errorMessage={errors.password} />}
            {formErrors.password && formErrors.password.length > 0 && <FormError errorMessage={formErrors.password[0]} />}

            <Checkbox.Item
              label="Deseja atualizar sua senha?"
              status={isUpdatingPassword ? 'checked' : 'unchecked'}
              onPress={() => {
                if (isUpdatingPassword) {
                  handleChange('new_password')('');
                  handleChange('new_password_confirmation')('');
                }
                setIsUpdatingPassword(!isUpdatingPassword);
              }}
            />

            {isUpdatingPassword && (
              <>
                <PasswordInput
                  label="Insira sua nova senha*"
                  placeholder="Sua nova senha..."
                  value={values.new_password ?? ''}
                  onChangeText={(text) => {
                    handleChange('new_password')(text);
                    cleanFieldError('new_password');
                  }}
                />
                {(errors.new_password && touched.new_password) && <FormError errorMessage={errors.new_password} />}
                {formErrors.new_password && formErrors.new_password.length > 0 && <FormError errorMessage={formErrors.new_password[0]} />}

                <PasswordInput
                  label="Confirme sua nova senha*"
                  placeholder="Confirme sua nova senha..."
                  value={values.new_password_confirmation ?? ''}
                  onChangeText={(text) => {
                    handleChange('new_password_confirmation')(text);
                    cleanFieldError('new_password_confirmation');
                  }}
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
  pageHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  }
});

export default PersonalDataForm;
