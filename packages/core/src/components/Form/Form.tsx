import React from 'react';

export interface FormPublicProps {
  children?: React.ReactChild,
  className?: any,
}

interface FormProps extends FormPublicProps {
  handleOnSubmit: (payload: any) => void,
}

/**
 * Form component that will make use of Formik to validate all inputs declared as its children.
 * The inputs should be enclosed by the FormInput component.
 */
const Form = ({
  handleOnSubmit,
  className,
  children,
}: FormProps) => (
  <form onSubmit={handleOnSubmit} className={className}>
    {children}
  </form>
);

export default Form;
