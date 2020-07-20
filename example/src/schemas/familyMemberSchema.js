import { createSchema } from '@formup/core';
import * as yup from 'yup';

import locale from '../locale';

// You don't need to use createSchema if you're not customizing your locale.
// You can use yup instead, no problems!
const familyMemberSchema = createSchema({
  name: yup.string()
    .required()
    .label('Name'),

  age: yup.number()
    .min(0)
    .max(120)
    .label('Age'),

  email: yup.string()
    .email()
    .label('Email'),
}, locale);

export default familyMemberSchema;
