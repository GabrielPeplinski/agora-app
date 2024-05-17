import * as Yup from 'yup';

const brazilianStates: string[] = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
];

const LoginValidation = Yup.object().shape({
  zipCode: Yup.string()
    .required('Campo CEP é obrigatório')
    .min(8, 'O CEP deve ter pelo menos 8 caracteres')
    .max(8, 'O CEP deve ter no máximo 8 caracteres')
    .trim(),

  cityName: Yup.string()
    .required('Campo cidade é obrigatório')
    .min(3, 'A cidade deve ter pelo menos 3 caracteres')
    .max(255, 'A cidade deve ter no máximo 255 caracteres')
    .trim(),

  neighborhood: Yup.string()
    .required('Campo bairro é obrigatório')
    .min(3, 'O bairro deve ter pelo menos 3 caracteres')
    .max(255, 'O bairro deve ter no máximo 255 caracteres')
    .trim(),

  stateAbbreviation: Yup.string()
    .required('Campo estado é obrigatório')
    .min(2, 'O estado deve ter pelo menos 2 caracteres')
    .max(2, 'O estado deve ter no máximo 2 caracteres')
    .oneOf(brazilianStates, 'Estado inválido')
    .trim(),
});

export default LoginValidation;
