import { FormikErrors, withFormik } from 'formik';
import { InnerForm } from './InnerForm';

export interface FormValues {
  username: string,
  password: string
}

interface HandleFunction {
  (values: FormValues): void
}

interface LoginFormProps {
  initialUsername?: string,
  handleSubmit: HandleFunction
}

// Pretty much 1:1 from documentation example
// https://formik.org/docs/guides/typescript
export const CreateForm = withFormik<LoginFormProps, FormValues>({
  mapPropsToValues: props => {
    return {
      username: props.initialUsername || '',
      password: ''
    };
  },
  validate: (values: FormValues) => {
    const errors: FormikErrors<FormValues> = {};
    if (!values.username) {
      errors.username = 'Required';
    }
    if (!values.password) {
      errors.password = 'Required';
    }
    return errors;
  },
  handleSubmit: (values, bag) => bag.props.handleSubmit(values)
})(InnerForm);
