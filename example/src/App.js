import React from 'react';
import * as yup from 'yup';

import useFormup, {
  createSchema,
} from '@formup/core';

// You can customize your locale to support multiple languages easily using createSchema!
const locale = {
  mixed: {
    default: 'Invalid field!',
  },
};

// You don't need this if you're not customizing your locale. You can use yup instead.
const schema = createSchema({
  // Your schema supports simple field
  name: yup.string()
    .required()
    .label('Name'),

  // Or a field with custom validations
  email: yup.string()
    .required()
    .email()
    .label('Email'),

  // Optional fields too
  phone: yup.string()
    .required()
    .label('Phone'),

  // And even multi-level nested fields!
  authentication: yup.object().shape({
    password: yup.string()
      .required()
      .min(5)
      .label('Password'),
    confirmPassword: yup.string()
      .required()
      .min(5)
      .oneOf([yup.ref('password'), null])
      .label('Confirm your password'),
  }),
}, locale);

const App = () => {
  // You can add custom error handling if your validation fails
  const handleValidationError = (errors) => {
    console.warn('Form validation error!', errors);
  };

  // Here we'll handle submiting the form
  const handleSubmitForm = (values) => {
    const {
      name,
      phone,
      email,
      password,
      confirmPassword,
    } = values;

    console.warn('Form is valid! Submitting information...', {
      name,
      phone,
      email,
      password,
      confirmPassword,
    });

    // Submit your form to your backend or any API here! =).
    return true;
  };

  // Initialize your Formup form
  const {
    submitForm,
    FormInput,
    Form,
  } = useFormup(schema, {
    // Formik options
    onError: handleValidationError,
    onSubmit: handleSubmitForm,
  });

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
          <span role="img" aria-label="Formup is awesome"> 😆</span>
        </h2>

        {/*
          FormInput will take care of all validation!
          Simply provide the "name" prop.
        */}

        <FormInput className="form-input" name="name" label="Name" />
        <FormInput className="form-input" name="email" label="Email" />
        <FormInput className="form-input" name="phone" label="Phone" />

        <FormInput type="password" className="form-input" name="authentication.password" label="Password" />
        <FormInput type="password" className="form-input" name="authentication.confirmPassword" label="Confirm Password" />

        <button type="submit" className="form-button" onClick={submitForm}>
          Submit!
        </button>
      </Form>
    </div>
  );
};

export default App;
