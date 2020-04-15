import React from 'react';

export interface DefaultInputGroupItemComponentProps extends React.Props<any> {
  label?: string,
  error?: boolean,
  multi?: boolean;
}

/**
 * Default Formup input component.
 * @param param0 Options.
*/
const DefaultInputGroupItemComponent = ({
  label,
  error,
  multi,
  ...props
}: DefaultInputGroupItemComponentProps) => {
  const inputType = multi ? 'checkbox' : 'radio';

  return (
    <>
      {
        label && (
          <p>
            {label}
          </p>
        )
      }

      <input type={inputType} {...props} />
    </>
  );
};

export default DefaultInputGroupItemComponent;
