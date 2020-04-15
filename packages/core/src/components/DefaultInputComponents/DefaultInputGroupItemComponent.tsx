import React from 'react';

import { FormInputGroupComponentProps } from '../FormInputGroupItem/FormInputGroupItem';

export interface DefaultInputGroupItemComponentProps extends FormInputGroupComponentProps {
  label?: string,
}

/**
 * Default Formup input component.
 * @param param0 Options.
*/
const DefaultInputGroupItemComponent = ({
  label,
  ...props
}: DefaultInputGroupItemComponentProps) => (
  <>
    {
        label && (
          <label>
            {label}
          </label>
        )
      }

    <input {...props} />
  </>
);

export default DefaultInputGroupItemComponent;
