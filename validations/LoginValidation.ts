import * as Yup from 'yup';

const LoginValidation = Yup.object().shape({
  email: Yup.string()
    .email('E-mail inválido')
    .required('Campo e-mail é obrigatório')
    .trim(),

  password: Yup.string()
    .required('Campo senha é obrigatório')
    .trim(),
});

export default LoginValidation;
