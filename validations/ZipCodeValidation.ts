import * as Yup from 'yup';

const ZipCodeValidation = Yup.object().shape({
  zipCode: Yup.string()
    .required('Campo CEP é obrigatório')
    .min(8, 'Campo CEP deve conter a quantidade correta de caracteres')
    .max(8, 'Campo CEP deve conter a quantidade correta de caracteres')
    .trim(),
});

export default ZipCodeValidation;
