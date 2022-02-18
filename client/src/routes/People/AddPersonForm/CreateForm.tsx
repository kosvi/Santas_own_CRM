import { FormikErrors, withFormik } from 'formik';
import { HandleFunction } from '../../../types';
import { InnerForm } from './InnerForm';

export interface FormValues {
  name: string,
  birthdate: string,
  address: string
}

interface NewPersonFormProps {
  handleSubmit: HandleFunction<FormValues>
}

export const CreateForm = withFormik<NewPersonFormProps, FormValues>({
  mapPropsToValues: props => {
    return {
      name: '',
      birthdate: '',
      address: ''
    };
  },
  validate: (values: FormValues) => {
    const errors: FormikErrors<FormValues> = {};
    if (!values.name) {
      errors.name = 'Name is required';
    }
    if (!values.birthdate) {
      errors.birthdate = 'Birthdate is required';
    }
    if (!values.address) {
      errors.address = 'Address is required';
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
