import { FormikErrors, withFormik } from 'formik';
import { HandleFunction } from '../../../types';
import { InnerForm } from './InnerForm';

export interface FormValues {
  name: string,
  username: string,
  password: string
}

interface NewUserFormProps {
  handleSubmit: HandleFunction<FormValues>
}

export const CreateForm = withFormik<NewUserFormProps, FormValues>({
  mapPropsToValues: () => {
    return {
      name: '',
      username: '',
      password: ''
    };
  },
  validate: (values: FormValues) => {
    const errors: FormikErrors<FormValues> = {};
    if (!values.name) {
      errors.name = 'Name is required';
    }
    if (!values.username) {
      errors.username = 'Username is required';
    }
    if (!values.password) {
      errors.password = 'Password is required';
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
