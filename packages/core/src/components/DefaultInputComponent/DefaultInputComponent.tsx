import React from 'react';

export interface DefaultInputComponentProps extends React.Props<any> {
  label?: string,
}

/**
 * Default Formup input component.
 * @param param0 Options.
*/
const DefaultInputComponent = ({
  label,
  ...props
}: DefaultInputComponentProps) => (
  <div>
    {
      label && (
        <p>{label}</p>
      )
    }
    <input {...props} />
  </div>
);

export default DefaultInputComponent;
