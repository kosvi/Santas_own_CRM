import { FormikErrors, withFormik } from 'formik';
import { HandleFunction } from '../../../types';
import { InnerForm } from './InnerForm';

export interface FormValues {
  niceness: number,
  description: string,
}

interface NewEntryProps {
  handleSubmit: HandleFunction<FormValues>
}

export const CreateForm = withFormik<NewEntryProps, FormValues>({
  mapPropsToValues: () => {
    return {
      niceness: 0,
      description: ''
    };
  },
  validate: (values: FormValues) => {
    const errors: FormikErrors<FormValues> = {};
    if (!values.niceness) {
      errors.niceness = 'Niceness has to be a number';
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
