import React from 'react';
import { FormikProps, Form, Field } from 'formik';
import { FormValues } from './CreateForm';

// this is pretty much copy & paste from documentation
// https://formik.org/docs/guides/typescript
export const InnerForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form>
      <Field type="text" name="username" />
      {touched.username && errors.username && <div>{errors.username}</div>}
      <Field type="password" name="password" />
      {touched.password && errors.password && <div>{errors.password}</div>}
      <button type="submit" disabled={isSubmitting}>
        Login
      </button>
    </Form>
  );
};

