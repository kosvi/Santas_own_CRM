import React from 'react';
import { FormikProps, Form, Field } from 'formik';
import { FormValues } from './CreateForm';

export const InnerForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form>
      <div>
        <Field type="text" name="name" placeholder="Name" />
        {touched.name && errors.name && <span className="PersonFormError"> {errors.name}</span>}
      </div>
      <div>
        <Field type="text" name="birthdate" placeholder="Birthdate" />
        {touched.birthdate && errors.birthdate && <span className="PersonFormError"> {errors.birthdate}</span>}
      </div>
      <div>
        <Field type="text" name="address" placeholder="Address" />
        {touched.address && errors.address && <span className="PersonFormError"> {errors.address}</span>}
      </div>
      <div>
        <button type="submit" disabled={isSubmitting}>
          Save
        </button>
      </div>
    </Form>
  );
};