import React from 'react';

import { TextField } from '@material-ui/core';

const TextFieldWithErrorMessage = ({
  formupData,
  ...props
}) => (
  <TextField
    {...props}
    helperText={formupData && formupData.errorMessage}
  />
);

export default TextFieldWithErrorMessage;
