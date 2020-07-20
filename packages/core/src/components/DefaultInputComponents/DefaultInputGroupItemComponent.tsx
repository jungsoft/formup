import React from 'react';

import { DefaultInputGroupItemComponentProps } from '../../interfaces';

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
