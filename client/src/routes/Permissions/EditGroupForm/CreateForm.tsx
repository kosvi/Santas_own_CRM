import React from 'react';
import { withFormik } from 'formik';
import { Functionality, HandleFunction } from '../../../types';
import { InnerForm } from './InnerForm';

export interface FormValues {
  permission: Functionality
}

interface PermissionFormProps {
  permission: Functionality,
  handleSubmit: HandleFunction<Functionality>
}

export const CreateForm = withFormik<PermissionFormProps, FormValues>({
  mapPropsToValues: props => {
    return {
      permission: props.permission
    };
  },
  handleSubmit: async (values) => {
    console.log(values);
  }
})(InnerForm);