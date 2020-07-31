# Formup

[![NPM](https://img.shields.io/npm/v/@formup/core.svg?style=flat-square)](https://www.npmjs.com/package/@formup/core)
[![Languages](https://img.shields.io/github/languages/count/jungsoft/formup?style=flat-square)](#)
[![Stars](https://img.shields.io/github/stars/jungsoft/formup?style=flat-square)](https://github.com/jungsoft/formup/stargazers)
[![Forks](https://img.shields.io/github/forks/jungsoft/formup?style=flat-square)](https://github.com/jungsoft/formup/network/members)
[![Contributors](https://img.shields.io/github/contributors/jungsoft/formup?style=flat-square)](https://github.com/jungsoft/formup/graphs/contributors)

> Integrated form validation using Formik + Yup.

Formup integrates Formik with Yup, reducing the code overhead needed to create your forms to zero!

It provides the best of both worlds for all of your forms so you can create, initialize and validate any form in only a few lines of code 📝💯.

Of course, you'll still have all validation options and functionality from Yup and all helpers from Formik. Formup is essentially a bridge between these two libraries so that you can work easily without worrying about writing any middleware.

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
        FormInput will take care of all validation and property mapping!

        Properties such as "label" will be automatically inherited from your
        schema, but you can override them by passing the prop to FormInput.

        You simply need to provide the "name" prop.
      */}

      <FormInput name="name" />
      <FormInput name="email" />
      <FormInput name="age" label="Custom Age Label" />

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
  <FormInputGroup name="favoriteFood" multi initialValue={['Oreo', 'Pie']}>
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

## Usage - Rendering array of objects

You can use formup to easily render any array type, by using `FormArrayField`.

The `FormArrayField` component will provide both the `items` from the array field and an
`arrayHelpers` object which contains methods to add or remove new items to the list.

Here's an example:

 ```jsx
const {
  formikForm,
  Form,
  FormArrayField,
} = useFormup(...);

<Form formikForm={formikForm}>
  <FormArrayField name="colors">
    {(items, arrayHelpers) => (
      <>
        {items.map((item, index) => (
          <div>
            <FormInput
              component={TextFieldWithErrorMessage}
              injectFormupData
              name={item.path}
            />

            <button
              onClick={() => arrayHelpers.remove(index)}
              type="button"
            >
              Remove item
            </button>
          </div>
        ))}

        <button
          onClick={() => arrayHelpers.push()}
          type="button"
        >
          Add item
        </button>
      </>
    )}
  </FormArrayField>
</Form>
```

But don't worry, if your array contains a complex object inside of it, `FormArrayField` can
help as well.

You can use the `getPath` function in each item to get the full path of the nested object
of that item of the list.

And you can also push a new item with initial values, pretty cool, isn't it?

Here's an example:

 ```jsx
const {
  formikForm,
  Form,
  FormArrayField,
} = useFormup(...);

<Form formikForm={formikForm}>
  <FormArrayField name="familyMembers">
    {(items, arrayHelpers) => (
      <>
        {items.map((item, index) => (
          <div>
            <FormInput
              component={TextFieldWithErrorMessage}
              name={item.getPath('name')}
              injectFormupData
            />

            <FormInput
              component={TextFieldWithErrorMessage}
              name={item.getPath('age')}
              injectFormupData
            />

            <button
              onClick={() => arrayHelpers.remove(index)}
              type="button"
            >
              Remove item
            </button>
          </div>
        ))}

        <button
          onClick={() => arrayHelpers.push({
            name: 'John Foo clone',
            age: 10,
          })}
          type="button"
        >
          Add item
        </button>
      </>
    )}
  </FormArrayField>
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

## Usage - Custom Validation

When submitting your form with formup, note that your form won't be validated if it isn't valid.

You can choose to validate the whole form (which formup does by default), or:
 - Validate only one field
 - Validate an array of fields
 - Validate only one object (nested fields)
 - Validate an array of objects (nested fields)
 - Validate fields + objects

To do this, you simply need to pass `validationOptions.path` to formup `submitForm` options:

```tsx
const {
  submitForm,
} = useFormup(schema, {
  onSubmit: handleSubmitForm,
});

// This will validate only "name" field
submitForm({
  validationOptions: {
    paths: 'name',
  },
});

// This will validate "name" and "phone" fields
submitForm({
  validationOptions: {
    paths: [
      'name',
      'phone',
    ],
  },
});

// This will validate all fields within "personalInformation" object
submitForm({
  validationOptions: {
    paths: 'personalInformation',
  },
});

// This will validate the field "document" within "personalInformation" object,
// the field "job" within "professionalInformation",
// and also the "name" field
submitForm({
  validationOptions: {
    paths: [
      'personalInformation.document',
      'professionalInformation.job',
      'name',
    ],
  },
});
```

## Usage - Custom form initial values

By default, formup will already create the form initial values according to your yup schema. This means that any `default(...)` will be taken into consideration, and it will always initialize the form as an empty valid object of your schema.

For example, the schema:

```js
const schema = yup.object().shape({
  userId: yup
    .number()
    .default(100),
  personalInformation: yup.object().shape({
    firstName: yup
      .string()
      .required(),
    email: yup
      .string()
      .default("user@example.com")
      .required(),
  }),
});
```

Will automatically translate to:

```js
{
  userId: 100,
  personalInformation: {
    firstName: "",
    email: "user@example.com",
  },
}
```

However, you can customize any value generated within your initial values by passing `initialValues` to `useFormup` options. Formup will automatically merge the two objects into one, taking your overrides into consideration.

Here's an example, using the schema declared above:

```js
useFormup(schema, {
  initialValues: {
    userId: 999,
    personalInformation: {
      firstName: "Foo",
    },
  },
});
```

This will produce:

```js
{
  userId: 999,
  personalInformation: {
    firstName: "Foo",
    email: "user@example.com",
  },
}
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
