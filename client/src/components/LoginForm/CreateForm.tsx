import { FormikErrors, withFormik } from 'formik';
import { InnerForm } from './InnerForm';
import { HandleFunction } from '../../types';

export interface FormValues {
  username: string,
  password: string
}

interface LoginFormProps {
  initialUsername?: string,
  handleSubmit: HandleFunction<FormValues>
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
      errors.username = 'Username required';
    }
    if (!values.password) {
      errors.password = 'Password required';
    }
    return errors;
  },
  handleSubmit: async (values, bag) => {
    const success = await bag.props.handleSubmit(values);
    if (success) {
      bag.resetForm();
    }
  }
})(InnerForm);
