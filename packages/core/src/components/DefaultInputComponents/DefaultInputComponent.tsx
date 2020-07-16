import React from 'react';

import { FormInputComponentProps } from '../../interfaces';

/**
 * Default Formup input component.
 * @param param0 Options.
*/
const DefaultInputComponent = ({
  formupData,
  error,
  label,
  ...props
}: FormInputComponentProps) => (
  <>
    {
      label && (
        <p>
          {label}
        </p>
      )
    }

    <input {...props} />

    {
      error && formupData?.errorMessage && (
        <p>
          {formupData?.errorMessage}
        </p>
      )
    }
  </>
);

export default DefaultInputComponent;
