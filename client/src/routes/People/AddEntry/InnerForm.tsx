import React from 'react';
import { FormikProps, Form, Field } from 'formik';
import { FormValues } from './CreateForm';

export const InnerForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form>
      <div>
        <Field type="number" name="niceness" placeholder="Niceness" />
        {touched.niceness && errors.niceness && <span className="PersonFormError"> {errors.niceness}</span>}
      </div>
      <div>
        <Field type="text" name="description" placeholder="Description" />
        {touched.description && errors.description && <span className="PersonFormError"> {errors.description}</span>}
      </div>
      <div>
        <button type="submit" disabled={isSubmitting}>
          Save
        </button>
      </div>
    </Form>
  );
};