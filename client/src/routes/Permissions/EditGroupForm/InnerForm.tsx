import React from 'react';
import { FormikProps, Form, Field } from 'formik';
import { FormValues } from './CreateForm';

export const InnerForm = (props: FormikProps<FormValues>) => {

  const { read, write } = props.initialValues.permission.permission;
  console.log(props.initialValues.permission.name, read, write);

  return (
    <Form>
      <div>
        <Field type="hidden" name="id" value={props.initialValues.permission.id} />
      </div>
      <div>
        <Field type="checkbox" name="permissions" value="read" checked={read} />
        <Field type="checkbox" name="permissions" value="write" checked={write} />
      </div>
      <div>
        <button type="submit" disabled={props.isSubmitting}>
          Save
        </button>
      </div>
    </Form>
  );
};