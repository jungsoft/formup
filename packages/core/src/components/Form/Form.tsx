import React from 'react';
import classNames from 'classnames';

import { FORMUP_FORM_CLASS_NAME } from '../../constants/identifiers';
import FormContainer from '../../contexts/FormContext/FormContainer';

export interface FormPublicProps {
  children?: React.ReactChild,
  className?: any,
}

interface FormProps extends FormPublicProps {
  handleOnSubmit: (payload: any) => void,
  formikForm: any,
}

/**
 * Form component that will make use of Formik to validate all inputs declared as its children.
 * The inputs should be enclosed by the FormInput component.
 */
const Form = ({
  handleOnSubmit,
  formikForm,
  className,
  children,
}: FormProps) => {
  const formClassName = classNames(FORMUP_FORM_CLASS_NAME, className);

  return (
    <FormContainer form={formikForm}>
      <form onSubmit={handleOnSubmit} className={formClassName}>
        {children}
      </form>
    </FormContainer>
  );
};

export default Form;
