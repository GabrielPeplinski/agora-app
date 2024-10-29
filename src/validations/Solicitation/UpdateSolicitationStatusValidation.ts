import * as Yup from 'yup';

const UpdateSolicitationStatusValidation = Yup.object().shape({
  status: Yup.string()
    .nullable()
    .required('Status é obrigatório'),

  image: Yup.string()
    .nullable()
    .required('A foto é obrigatória'),
});

export default UpdateSolicitationStatusValidation;
