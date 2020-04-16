import React, { useState } from 'react';
import * as yup from 'yup';
import classNames from 'classnames';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import GitHubIcon from '@material-ui/icons/GitHub';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import Card from '@material-ui/core/Card';
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

  // You can control single choice fields using Form Groups
  gender: yup.string()
    .required()
    .label('Gender'),

  acceptedTerms: yup.boolean()
    .default(false)
    .label('Accepted terms'),

  // You can control single choice fields using Form Groups
  favouriteFood: yup.string()
    .label('Favourite Food'),

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
  const [submissionResult, setSubmissionResult] = useState('');

  // You can add custom error handling if your validation fails
  const handleValidationError = (errors) => {
    setSubmissionResult(`Form validation errors! \n ${JSON.stringify(errors, null, 2)}`);
  };

  // Here we'll handle submiting the form
  const handleSubmitForm = (values) => {
    setSubmissionResult(`Form is valid! \n ${JSON.stringify(values, null, 2)}`);

    // Submit your form to your backend or any API here! =).
    return true;
  };

  // Initialize your Formup form
  const {
    FormInputGroupItem,
    FormInputGroup,
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
      <Grid
        item
        xs={12}
        className={classNames(classes.marginTop5, classes.centerContent, classes.cardContainer)}
      >
        <Card className={classes.card} elevation={5}>
          <Typography variant="h4" align="center">
            Formup

            <Typography variant="body1" align="center">
              {'...is awesome! '}
              <span role="img" aria-label="Formup is awesome">😆</span>
            </Typography>
          </Typography>

          <Form formikForm={formikForm} className={classNames(classes.form, classes.marginTop5)}>
            <Typography variant="h5" align="left">
              <span role="img" aria-label="Check">✅</span>
              {' Default inputs'}
            </Typography>

            <Typography variant="body1" align="left" className={classes.subtitle}>
              FormInput will take care of all validation, according to your yup schema!
              Simply provide the <strong>name</strong> prop to link with your schema field.
            </Typography>

            <FormInput name="name" label="Name" />

            <Typography variant="h5" align="left" className={classes.marginTop5}>
              <span role="img" aria-label="Check">✅</span>
              {' Custom inputs'}
            </Typography>

            <Typography variant="body1" align="left" className={classes.subtitle}>
              You can render <strong>ANY</strong> custom input as a component!
            </Typography>

            <Typography variant="body1" align="left" className={classes.subtitle}>
              You can pass any custom props to your components too. =)
            </Typography>

            <FormInput
              name="customInput"
              title="I am a custom input component!"
              component={CustomInput}
            />

            <FormInput name="email" label="Email" component={TextField} />
            <FormInput name="phone" label="Phone" component={TextField} />

            <Typography variant="h5" align="left" className={classes.marginTop5}>
              <span role="img" aria-label="Check">✅</span>
              {' Yup nested inputs'}
            </Typography>

            <Typography variant="body1" align="left" className={classes.subtitle}>
              Formup also supports <strong>unlimited</strong> nesting with yup!
            </Typography>

            <Typography variant="body1" align="left" className={classes.subtitle}>
              The inputs below all belong to an object named authentication in the schema.
            </Typography>

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

            <Typography variant="h5" align="left" className={classes.marginTop5}>
              <span role="img" aria-label="Check">✅</span>
              {' Single-choice inputs'}
            </Typography>

            <Typography variant="body1" align="left" className={classes.subtitle}>
              With Formup, you can control single-choice inputs easily!
            </Typography>

            <Typography variant="body1" align="left" className={classes.subtitle}>
              You can use <strong>FormInputGroup</strong> and
              <strong> FormInputGroupItem</strong> components for this.
            </Typography>

            <FormInputGroup name="gender">
              <Typography variant="body2" align="left" className={classes.marginTop2}>
                What's your gender?
              </Typography>

              <FormControlLabel
                control={<FormInputGroupItem value="Male" component={Radio} />}
                label="Male"
              />

              <FormControlLabel
                control={<FormInputGroupItem value="Female" component={Radio} />}
                label="Female"
              />

              <FormControlLabel
                control={<FormInputGroupItem value="Non-binary" component={Radio} />}
                label="Non-binary"
              />
            </FormInputGroup>

            <Typography variant="h5" align="left" className={classes.marginTop5}>
              <span role="img" aria-label="Check">✅</span>
              {' Single-choice toggle inputs'}
            </Typography>

            <Typography variant="body1" align="left" className={classes.subtitle}>
              You can render a single-choice input with only one option too!
            </Typography>

            <Typography variant="body1" align="left" className={classes.subtitle}>
              It will toggle between `initialValue` and its `value`.
            </Typography>

            <FormInputGroup name="acceptedTerms" initialValue={false}>
              <FormControlLabel
                control={<FormInputGroupItem value={true} component={Checkbox} />}
                label="I've accepted the terms of service (which I didn't read)"
              />
            </FormInputGroup>

            <Typography variant="h5" align="left" className={classes.marginTop5}>
              <span role="img" aria-label="Check">✅</span>
              {' Multiple-choice inputs'}
            </Typography>

            <Typography variant="body1" align="left" className={classes.subtitle}>
              What did you expect? Well, of course we support multiple-choice inputs too!
            </Typography>

            <Typography variant="body1" align="left" className={classes.subtitle}>
              Oh, did I mention you can use <strong>initialValue </strong>
              to set the initial checked items?
            </Typography>

            <FormInputGroup name="favouriteFood" multi initialValue={['Cupcake', 'Donut']}>
              <Typography variant="body2" align="left" className={classes.marginTop2}>
                What's favourite food? You can pick as many as you want!
              </Typography>

              <FormControlLabel
                control={<FormInputGroupItem value="Cupcake" component={Checkbox} />}
                label="Cupcake"
              />

              <FormControlLabel
                control={<FormInputGroupItem value="Donut" component={Checkbox} />}
                label="Donut"
              />

              <FormControlLabel
                control={<FormInputGroupItem value="Ice Cream Sandwich" component={Checkbox} />}
                label="Ice Cream Sandwich"
              />

              <FormControlLabel
                control={<FormInputGroupItem value="Jelly Bean" component={Checkbox} />}
                label="Jelly Bean"
              />

              <FormControlLabel
                control={<FormInputGroupItem value="KitKat" component={Checkbox} />}
                label="KitKat"
              />

              <FormControlLabel
                control={<FormInputGroupItem value="Lollipop" component={Checkbox} />}
                label="Lollipop"
              />

              <FormControlLabel
                control={<FormInputGroupItem value="Marshmallow" component={Checkbox} />}
                label="Marshmallow"
              />

              <FormControlLabel
                control={<FormInputGroupItem value="Nougat" component={Checkbox} />}
                label="Nougat"
              />

              <FormControlLabel
                control={<FormInputGroupItem value="Oreo" component={Checkbox} />}
                label="Oreo"
              />

              <FormControlLabel
                control={<FormInputGroupItem value="Pie" component={Checkbox} />}
                label="Pie"
              />
            </FormInputGroup>

            <Typography variant="h5" align="left" className={classes.marginTop5}>
              <span role="img" aria-label="Check">📝</span>
              {' Form value'}
            </Typography>

            <Typography variant="body1" align="left" className={classes.subtitle}>
              Here's your fancy form value in a beaultiful real-time JSON string.
            </Typography>

            <TextField
              multiline
              rows={15}
              variant="outlined"
              className={classes.fullWidth}
              value={JSON.stringify(formikForm.values, null, 2)}
            />

            <Typography variant="h5" align="left" className={classes.marginTop5}>
              <span role="img" aria-label="Check">📝</span>
              {' Form submission result'}
            </Typography>

            <Typography variant="body1" align="left" className={classes.subtitle}>
              If you press the button below you'll see the results here!
            </Typography>

            <TextField
              multiline
              rows={5}
              variant="outlined"
              className={classes.fullWidth}
              value={submissionResult}
            />

            <Divider />

            <Button
              className={classNames(classes.marginTop5, classes.centerSelf)}
              onClick={submitForm}
              variant="contained"
              color="primary"
            >
              {'Submit! '}
              <span role="img" aria-label="Formup is awesome">🚀</span>
            </Button>
          </Form>
        </Card>
      </Grid>

      <Grid item xs={12} className={classNames(classes.marginTop2, classes.centerContent)}>
        <Typography variant="body1" className={classes.subtitle}>
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
            {' and contributors @ '}
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
