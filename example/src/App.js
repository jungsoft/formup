import React from 'react';
import * as yup from 'yup';

import {
  useFormup,
  createSchema,
} from '@formup/core';

import CustomInput from './components/CustomInput';

// You can customize your locale to support multiple languages easily using createSchema!
const locale = {
  mixed: {
    default: 'Invalid field!',
  },
};

// You don't need to use createSchema if you're not customizing your locale.
// You can use yup instead, no problems!
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

  nickname: yup.string()
    .required(),

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
    formikForm,
    submitForm,
    FormInput,
    Form,
  } = useFormup(schema, {
    // Formik options
    onError: handleValidationError,
    onSubmit: handleSubmitForm,
  });

  return (
    <Form formikForm={formikForm}>
      <h2>
        Formup is awesome
        <span role="img" aria-label="Formup is awesome"> 😆</span>
      </h2>

      {/*
        FormInput will take care of all validation!
        Simply provide the "name" prop.
      */}

      <FormInput name="name" label="Name" />
      <FormInput name="email" label="Email" />
      <FormInput name="phone" label="Phone" />

      {/*
        It will take care of nested fiels too!
      */}

      <FormInput type="password" name="authentication.password" label="Password" />
      <FormInput type="password" name="authentication.confirmPassword" label="Confirm Password" />

      {/*
        And of course, you can render custom inputs =).
      */}

      <FormInput name="nickname" title="Your nickname goes below" component={CustomInput} />

      <button type="button" className="form-button" onClick={submitForm}>
        Submit!
        <span role="img" aria-label="Formup is awesome"> 🚀</span>
      </button>
    </Form>
  );
};

export default App;
