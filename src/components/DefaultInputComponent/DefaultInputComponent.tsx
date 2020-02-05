import React from 'react';

export interface DefaultInputComponentProps extends React.Props<any> {
  label?: string,
}

const DefaultInputComponent = ({
  label,
  ...props
}: DefaultInputComponentProps) => (
  <>
    {
      label && (
        <p>{label}</p>
      )
    }
    <input {...props} />
  </>
);

export default DefaultInputComponent;
