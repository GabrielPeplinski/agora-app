import * as Yup from 'yup';

const RegisterValidation = Yup.object().shape({
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
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .trim(),

  password_confirmation: Yup.string()
    .required('Confirmação de senha é obrigatória')
    .oneOf([Yup.ref('password')], 'As senhas devem ser iguais')
    .trim(),
});

export default RegisterValidation;
