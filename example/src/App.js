import React from 'react';
import * as yup from 'yup';
import {
  ValidatedFormInput,
  createSchema,
  Form,
} from "formup";

// You can customize your locale to support multiple languages easily using createSchema!
const locale = {
  mixed: {
    default: "Invalid field!",
  },
};

const schema = createSchema({
  // Your schema supports simple field
  name: yup.string()
    .required()
    .label("Name"),

  // Or a field with custom validations
  email: yup.string()
    .required()
    .email()
    .label("Email"),

  // Optional fields too
  phone: yup.string()
    .required()
    .label("Phone"),

  // And even multi-level nested fields!
  authentication: yup.object().shape({
    password: yup.string()
      .required()
      .min(5)
      .label("Password"),
    confirmPassword: yup.string()
      .required()
      .min(5)
      .oneOf([yup.ref("password"), null])
      .label("Confirm your password"),
  }),
}, locale);

const App = () => {
  // You can add custom error handling if your validation fails
  const handleValidationError = (errors) => {
    console.warn('Form validation error!', errors);
  };

  const handleSubmitForm = (values) => {
    const {
      name,
      phone,
      email,
      password,
      confirmPassword,
    } = values;

    console.warn('Form validation success!', {
      name,
      phone,
      email,
      password,
      confirmPassword,
    });

     // Submit your form to your backend or any API here! =).
     return true;
  };

  return (
    <div>
      <Form
        schema={schema}
        className="form"
        onSubmit={handleSubmitForm}
        onError={handleValidationError}
      >
        <h2>
          Formup is awesome
          <span role="img" aria-label="Awesome"> 😆</span>
        </h2>

        {/*
          ValidatedFormInput will take care of all validation!
          Simply provide the "name" prop.
        */}
        <ValidatedFormInput className="form-input" name="name" label="Name" />
        <ValidatedFormInput className="form-input" name="email" label="Email" />
        <ValidatedFormInput className="form-input" name="phone" label="Phone" />

        <ValidatedFormInput type="password" className="form-input" name="authentication.password" label="Password" />
        <ValidatedFormInput type="password" className="form-input" name="authentication.confirmPassword" label="Confirm Password" />

        <button className="form-button" type="submit">
          Submit!
        </button>
      </Form>
    </div>
  );
};

export default App;
