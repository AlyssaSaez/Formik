import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const FriendForm = props => (
  <div>
    <Formik
      initialValues={{ name: "", age: "", email: "" }}
      onSubmit={(values, actions) => {
        props.submit(values);
      }}
      validate={values => {
        let errors = {};
        if (!values.email) {
          errors.email = "Required";
        }
        return errors;
      }}
      render={props => (
        <Form>
          <Field
            type="name"
            name="name"
            placeholder="name"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.name}
          />
          <Field
            type="age"
            name="age"
            placeholder="age"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.age}
          />
          <Field
            type="email"
            name="email"
            placeholder="Email"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.email}
          />
          <ErrorMessage name="email" component="div" />
          <button type="submit">Submit</button>
        </Form>
      )}
    />
  </div>
);

export default FriendForm;
