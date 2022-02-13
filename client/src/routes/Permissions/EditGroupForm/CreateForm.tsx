import React from 'react';
import { withFormik } from 'formik';
import { FunctionalityWithPermission, HandleFunction } from '../../../types';
import { InnerForm } from './InnerForm';

export interface FormValues {
  permission: FunctionalityWithPermission
}

interface PermissionFormProps {
  permission: FunctionalityWithPermission,
  handleSubmit: HandleFunction<FunctionalityWithPermission>
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