import React from 'react';
import { FormikProps, Form, Field } from 'formik';
import { FormValues } from './CreateForm';

// this is pretty much copy & paste from documentation
// https://formik.org/docs/guides/typescript
export const InnerForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form>
      <div>
        <Field type="text" data-testid="login-username" name="username" placeholder="username" />
      </div>
      {touched.username && errors.username && <div>{errors.username}</div>}
      {!(touched.username && errors.username) && <div>&nbsp;</div>}
      <div>
        <Field type="password" data-testid="login-password" name="password" placeholder="password" />
      </div>
      {touched.password && errors.password && <div>{errors.password}</div>}
      {!(touched.password && errors.password) && <div>&nbsp;</div>}
      <button type="submit" data-testid="login-submit" disabled={isSubmitting}>
        Login
      </button>
    </Form>
  );
};

