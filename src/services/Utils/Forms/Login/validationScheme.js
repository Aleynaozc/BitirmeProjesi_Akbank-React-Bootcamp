
import { ValidationMessages } from '../../enums/validation-enums/validationMessage';
import * as yup from 'yup';
export const SignInValidationScheme = yup.object().shape({
   password: yup.string().required(ValidationMessages.REQUIRED),
});