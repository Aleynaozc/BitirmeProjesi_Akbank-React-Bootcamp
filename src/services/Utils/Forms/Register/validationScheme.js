import * as yup from 'yup';
import { ValidationMessages } from '../../enums/validation-enums/validationMessage';

export const SignUpValidationScheme = yup.object().shape({
 username: yup.string().required(ValidationMessages.REQUIRED),
 password: yup.string().required(ValidationMessages.REQUIRED),
 passwordConfirm: yup.string().required(ValidationMessages.REQUIRED).oneOf([yup.ref('password'), null], ValidationMessages.PASSWORDNOTMATCH)
});