import { createSchema } from '@formup/core';
import * as yup from 'yup';

import familyMemberSchema from './familyMemberSchema';
import locale from '../locale';

/**
 * The example schemas
 *
 * You don't need to use createSchema if you're not customizing your locale.
 * You can use yup directly instead, no problems!
 */
const exampleSchema = createSchema({
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

  errorMessageExample: yup.string()
    .required('This is a custom validation message =)'),

  // You can control single choice fields using Form Groups
  gender: yup.string()
    .required()
    .label('Gender'),

  acceptedTerms: yup.boolean()
    .default(false)
    .label('Accepted terms'),

  // You can control single choice fields using Form Groups
  favoriteFood: yup.string()
    .label('Favorite Food'),

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

  // Also, array fields! <3
  colors: yup.array()
    .of(yup.string()),

  // Object arrays too!
  familyMembers: yup.array()
    .of(familyMemberSchema),
}, locale);

export default exampleSchema;
