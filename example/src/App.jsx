import React from 'react';
import * as yup from 'yup';
import classNames from 'classnames';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import GitHubIcon from '@material-ui/icons/GitHub';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import {
  useFormup,
  createSchema,
} from '@formup/core';

import CustomInput from './components/CustomInput';
import useStyles from './styles';

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

  customInput: yup.string()
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

  const classes = useStyles();

  return (
    <Grid container spacing={3} className={classes.centerContent}>
      <Grid item xs={12} className={classNames(classes.marginTop5, classes.centerContent)}>
        <Typography variant="h3">
          Formup is awesome
          <span role="img" aria-label="Formup is awesome"> 😆</span>
        </Typography>
      </Grid>

      <Grid item xs={12} className={classNames(classes.marginTop2, classes.centerContent)}>
        <Form formikForm={formikForm}>
          {/*
            FormInput will take care of all validation!
            Simply provide the "name" prop.
          */}

          <FormInput name="name" label="Name" />

          {/*
            You can render ANY custom input as a component! =)
            You can pass any custom props to your components too.
          */}

          <FormInput name="customInput" title="Custom input render!" component={CustomInput} />

          <FormInput name="email" label="Email" component={TextField} />
          <FormInput name="phone" label="Phone" component={TextField} />

          {/*
            Oh, and it will take care of nested fields too. <3
          */}

          <FormInput
            type="password"
            name="authentication.password"
            label="Password"
            component={TextField}
          />

          <FormInput
            type="password"
            name="authentication.confirmPassword"
            label="Confirm Password"
            component={TextField}
          />

          <Button
            className={classes.marginTop5}
            onClick={submitForm}
            variant="contained"
            color="primary"
          >
            Submit!
            <span role="img" aria-label="Formup is awesome"> 🚀</span>
          </Button>
        </Form>
      </Grid>

      <Grid item xs={12} className={classNames(classes.marginTop2, classes.centerContent)}>
        <Typography variant="body1">
          <span>
            {'Made with '}
            <span role="img" aria-label="github">❤️</span>
            {'by '}
            <a
              href="https://github.com/pedro-lb"
              rel="noopener noreferrer"
              target="_blank"
            >
              Pedro Bini
            </a>
          </span>

          <span>
            {' and contributors at '}
            <a
              href="https://www.npmjs.com/org/formup"
              rel="noopener noreferrer"
              target="_blank"
            >
              Formup
            </a>
          </span>
          .
        </Typography>

        <a
          href="https://github.com/pedro-lb/formup"
          rel="noopener noreferrer"
          className={classes.marginTop1}
          target="_blank"
        >
          <IconButton
            aria-label="github repo"
            className={classes.margin}
          >
            <GitHubIcon color="primary" fontSize="large" />
          </IconButton>
        </a>
      </Grid>
    </Grid>
  );
};

export default App;
