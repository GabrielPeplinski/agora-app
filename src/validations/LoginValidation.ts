import * as Yup from 'yup';

const LoginValidation = Yup.object().shape({
  email: Yup.string()
    .email('E-mail inválido')
    .required('Campo e-mail é obrigatório')
    .trim(),

  password: Yup.string()
    .required('Campo senha é obrigatório')
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .max(20, 'A senha deve ter no máximo 20 caracteres')
    .trim(),
});

export default LoginValidation;
