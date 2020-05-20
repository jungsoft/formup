# Formup

[![NPM](https://img.shields.io/npm/v/formup.svg)](https://www.npmjs.com/package/@formup/core) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Formup integrates Formik with Yup, reducing the code overhead needed to create your forms to zero!

It provides the best of both worlds for all of your forms so you can create, initialize and validate any form in only a few lines of code 📝💯.

Of course, you'll still have all validation options and functionality from Yup and all helpers from Formik. Formup is essentialy a bridge between these two libraries so that you can work easily without worrying about writing any middleware.

## Online Example

Online example [here](https://jungsoft.github.io/formup/).

## Installation

You can use `yarn`

```bash
yarn add @formup/core
```

Or `npm`, it's totally up to you!

```bash
npm install --save @formup/core
```

## Usage

```tsx
import * as React from 'react';
import * as yup from 'yup';

import { useFormup } from '@formup/core';

const schema = yup.object().shape({
  name: yup
    .string()
    .required()
    .label('Name'),
  email: yup.string()
    .required()
    .email()
    .label('Email'),
  age: yup
    .number()
    .integer()
    .positive()
    .required()
    .label('Age'),
});

const MyComponent = () => {
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

  const {
    formikForm,
    submitForm,
    FormInput,
    Form,
  } = useFormup(schema, {
    onError: handleValidationError,
    onSubmit: handleSubmitForm,
  });

  return (
    <Form formikForm={formikForm}>
      {/*
        FormInput will take care of all validation!
        Simply provide the "name" prop.
      */}

      <FormInput name="name" label="Name" />
      <FormInput name="email" label="Email" />
      <FormInput name="age" label="Age" />

      <button type="button" className="form-button" onClick={submitForm}>
        Submit!
      </button>
    </Form>
  );
};

export default MyComponent;
```

## Usage - Rendering Custom Inputs

You can render any custom component while still keeping all validation from Formup.

To do this, you just need to pass the `component` prop to `FormInput`. 🙋

```tsx
import * as React from 'react';
import * as yup from 'yup';

import { useFormup } from '@formup/core';

const schema = yup.object().shape({
  name: yup
    .string()
    .required()
    .label('Name'),
});

// We can easily render custom components using Formup!
const CustomInput = ({
  title, // Custom property
  ...props
}) => (
  <div>
    <p>{title}</p>
    <input {...props} />
  </div>
);

const MyComponent = () => {
  const handleSubmitForm = (values) => {
    console.warn('Form is valid! Submitting information...', values);

    // Submit your form to your backend or any API here! =).
    return true;
  };

  const {
    formikForm,
    submitForm,
    FormInput,
    Form,
  } = useFormup(schema, {
    onSubmit: handleSubmitForm,
  });

  return (
    <Form formikForm={formikForm}>
      {/*
        Here we'll render FormInput, but with a custom component!
      */}

      <FormInput
        name="name"
        component={CustomInput}
        title="Sign your name here, please!"
      />

      <button type="button" className="form-button" onClick={submitForm}>
        Submit!
      </button>
    </Form>
  );
};

export default MyComponent;
```

## Usage - Single-choice input groups

Formup can take care of input groups, such as checkboxes too!

You can also define an `initialValue`.

Here's an example:

```jsx
const {
  formikForm,
  Form,
  FormInputGroup,
  FormInputGroupItem,
} = useFormup(...);

<Form formikForm={formikForm}>
  <FormInputGroup name="gender" initialValue="Male">
    <p>What's your gender?</p>

    <FormInputGroupItem component={MyCustomRadioButton} value="Male" />
    <FormInputGroupItem component={MyCustomRadioButton} value="Female" />
    <FormInputGroupItem component={MyCustomRadioButton} value="Non-binary" />
  </FormInputGroup>
</Form>
```

## Usage - Multiple-choice input groups

What did you expect? Of course we support multiple choice input groups too =).

Just pass `multi` to `FormInputGroup`.

You can also define an `initialValue`, as an array with multiple options.

Here's an example:

```jsx
const {
  formikForm,
  Form,
  FormInputGroup,
  FormInputGroupItem,
} = useFormup(...);

<Form formikForm={formikForm}>
  <FormInputGroup name="favouriteFood" multi initialValue={['Oreo', 'Pie']}>
    <p>What's your gender?</p>

    <FormInputGroupItem value="Ice Cream Sandwich" component={Checkbox} />
    <FormInputGroupItem value="KitKat" component={Checkbox} />
    <FormInputGroupItem value="Lollipop" component={Checkbox} />
    <FormInputGroupItem value="Nougat" component={Checkbox} />
    <FormInputGroupItem value="Oreo" component={Checkbox} />
    <FormInputGroupItem value="Pie" component={Checkbox} />
  </FormInputGroup>
</Form>
```

## Usage - Extended Formup Data in Rendered Inputs

You can gather extended formup data in order to aid your custom inputs, such as the **validation error message**, for example.

To do this, you just need to pass the `injectFormupData` prop to `FormInput`. 🙋

This will mean that `FormInput` will inject a prop named `formupData` into your component, that contains extra information, such as the error message.

⚠️ This is disabled by default to maintain compatibility. If enabled, you need to make sure that `formupData` won't be injected into the final `<input />` component, otherwise React will throw an error saying that `formupData` is an invalid property for `<input />`.

Here's a quick example:

- In `FormInput`, add the `injectFormupData` prop.

```tsx
  <FormInput
    component={CustomInputWithErrorMessage}
    injectFormupData={true}
    name="email"
  />
```

- In your component, handle `formupData` prop:

```tsx
const CustomInputWithErrorMessage = ({
  formupData,
  ...props
}) => (
  <>
    {
      formupData && formupData.errorMessage && (
        <label>
          {`Error: ${formupData && formupData.errorMessage}`}
        </label>
      )
    }

    <input
      {...props}
    />
  </>
);
```

## Contributing

Pull requests are welcome!

If you have any feedback, issue or suggestion, feel free to open [a new issue](https://github.com/jungsoft/formup/issues/new) so we can talk about it 💬.

## Local testing

To test this locally we can use the `example` application!

- You need to update the dependencies at example's `package.json` to run locally:

```js
"dependencies": {
  "@formup/core": "link:../packages/core/dist",
  "react": "link:../packages/core/node_modules/react",
  "react-dom": "link:../packages/core/node_modules/react-dom",
  ...other dependencies
},
```

- Then at `example`, run:

```bash
yarn install

yarn start
```

- Whenever you change any file at `/packages/core`, you need to rebuild for changes to be applied:

```bash
yarn build
```

## License

MIT © [formup](https://www.npmjs.com/org/formup)

## Special Thanks

Thanks to [jaredpalmer](https://github.com/jaredpalmer/) and all maintainers for developing [formik](https://github.com/jaredpalmer/formik).

Thanks to [jquense](https://github.com/jquense/) and all maintainers for developing [yup](https://github.com/jquense/yup).


Made with ❤️ by [Pedro Bini](https://github.com/pedro-lb/) @ [Jungsoft](https://jungsoft.io/).
