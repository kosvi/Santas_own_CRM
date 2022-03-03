import React from 'react';
import { FormikProps, Form, Field } from 'formik';
import { FormValues } from './CreateForm';

export const InnerForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form>
      <div>
        <Field type="text" name="name" placeholder="Name" />
        {touched.name && errors.name && <span className="UserFormError"> {errors.name}</span>}
      </div>
      <div>
        <Field type="text" name="username" placeholder="Username" />
        {touched.username && errors.username && <span className="UserFormError"> {errors.username}</span>}
      </div>
      <div>
        <Field type="text" name="password" placeholder="Password" />
        {touched.password && errors.password && <span className="UserFormError"> {errors.password}</span>}
      </div>
      <div>
        <button type="submit" disabled={isSubmitting}>
          Save
        </button>
      </div>
    </Form>
  );
};