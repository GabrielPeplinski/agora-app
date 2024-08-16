import * as Yup from 'yup';

const PersonalDataValidation = Yup.object().shape({
  name: Yup.string()
    .required('Campo nome é obrigatório')
    .min(5, 'Nome deve conter no mínimo 5 caracteres')
    .max(255, 'Nome deve conter no máximo 255 caracteres')
    .trim(),

  email: Yup.string()
    .email('E-mail inválido')
    .required('Campo e-mail é obrigatório')
    .trim(),

  password: Yup.string()
    .required('Campo senha é obrigatório')
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .max(20, 'A senha deve ter no máximo 20 caracteres')
    .trim(),

  new_password: Yup.string()
    .nullable()
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .trim(),

  new_password_confirmation: Yup.string()
    .nullable()
    .oneOf([Yup.ref('new_password')], 'As senhas devem ser iguais')
    .when('new_password', {
      is: (val: string | null) => val && val.length > 0,
      then: schema => schema.required('Confirmação de senha é obrigatória'),
    })
    .trim(),
});

export default PersonalDataValidation;
