import { FormikErrors, withFormik } from 'formik';
import { HandleFunction } from '../../../types';
import { InnerForm } from './InnerForm';

export interface FormValues {
  itemName: string,
  description: string
}

interface NewWishProps {
  handleSubmit: HandleFunction<FormValues>
}

export const CreateForm = withFormik<NewWishProps, FormValues>({
  mapPropsToValues: () => {
    return {
      itemName: '',
      description: ''
    };
  },
  validate: (values: FormValues) => {
    const errors: FormikErrors<FormValues> = {};
    if (!values.itemName) {
      errors.itemName = 'Item name is required';
    }
    if (!values.description) {
      errors.description = 'Description is required';
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
