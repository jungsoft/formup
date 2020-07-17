import React, { useState } from 'react';
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

import { useFormup } from '@formup/core';

import TextFieldWithErrorMessage from './components/TextFieldWithErrorMessage';
import exampleSchema from './schemas/exampleSchema';
import CustomInput from './components/CustomInput';
import useStyles from './styles';

const App = () => {
  const [submissionResult, setSubmissionResult] = useState('');

  // You can add custom error handling if your validation fails
  const handleValidationError = (errors) => {
    setSubmissionResult(`Form validation errors! \n ${JSON.stringify(errors, null, 2)}`);
  };

  // Here we'll handle submitting the form
  const handleSubmitForm = (values) => {
    setSubmissionResult(`Form is valid! \n ${JSON.stringify(values, null, 2)}`);

    // Submit your form to your backend or any API here! =).
    return true;
  };

  // Initialize your Formup form
  const {
    FormInputGroupItem,
    FormInputGroup,
    FormArrayField,
    formikForm,
    submitForm,
    FormInput,
    Form,
  } = useFormup(exampleSchema, {
    // Formik options
    onError: handleValidationError,
    onSubmit: handleSubmitForm,
    initialValues: {
      colors: [
        'Blue',
        'Red',
      ],
    },
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

            <FormInput name="name" />

            <Typography variant="h5" align="left" className={classes.marginTop5}>
              <span role="img" aria-label="Check">✅</span>
              {' Custom inputs'}
            </Typography>

            <Typography variant="body1" align="left" className={classes.subtitle}>
              You can render <strong>ANY</strong> custom input as a component!
              Any custom prop passed to <strong>FormInput</strong> will be injected
              into your component. =)
            </Typography>

            <Typography variant="body1" align="left" className={classes.subtitle}>
              Formup is compatible out-of-the-box with major style libraries such
              as <strong>Material UI</strong>, <strong>React Bootstrap</strong> and
              much more!
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
              {' Extended Formup data in inputs'}
            </Typography>

            <Typography variant="body1" align="left" className={classes.subtitle}>
              If you pass the <strong>injectFormupData</strong> prop
              to <strong>FormInput</strong> component, it will inject a prop
              named <strong>formupData</strong> into the rendered component.
              With <strong>formupData</strong>, you can access extended information,
              such as the <strong>validation error message</strong>, if any.
            </Typography>

            <Typography variant="body1" align="left" className={classes.subtitle}>
              The prop <strong>injectFormupData</strong> is by default set
              to <strong>false</strong> in order to maintain compatibility and
              prevent errors. Note that when using this, <strong>you must make sure</strong> that
              the <strong>formupData</strong> prop is not injected into the
              final <strong>input</strong> component.
            </Typography>

            <FormInput
              name="errorMessageExample"
              label="Input with validation error message"
              title="I will show the error validation message!"
              component={TextFieldWithErrorMessage}
              className={classes.marginTop2}
              injectFormupData
            />

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
              component={TextFieldWithErrorMessage}
              injectFormupData
            />

            <FormInput
              type="password"
              name="authentication.confirmPassword"
              component={TextFieldWithErrorMessage}
              injectFormupData
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

            <FormInputGroup name="favoriteFood" multi initialValue={['Cupcake', 'Donut']}>
              <Typography variant="body2" align="left" className={classes.marginTop2}>
                What's favorite food? You can pick as many as you want!
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
              <span role="img" aria-label="Check">✅</span>
              {' Simple array fields'}
            </Typography>

            <Typography variant="body1" align="left" className={classes.subtitle}>
              Formup also supports simple array fields - such as
              arrays of primitive types and strings!
            </Typography>

            <Typography variant="body1" align="left" className={classes.subtitle}>
              You can use formup to easily render any array type,
              by using <strong>FormArrayField</strong>.
            </Typography>

            <FormArrayField name="colors">
              {(items) => items.map((item) => (
                <FormInput
                  component={TextFieldWithErrorMessage}
                  injectFormupData
                  name={item.path}
                  key={item.path}
                />
              ))}
            </FormArrayField>

            <Typography variant="h5" align="left" className={classes.marginTop5}>
              <span role="img" aria-label="Check">📝</span>
              {' Form value'}
            </Typography>

            <Typography variant="body1" align="left" className={classes.subtitle}>
              Here's your fancy form value in a beautiful real-time JSON string.
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
