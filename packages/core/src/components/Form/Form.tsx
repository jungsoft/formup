import React from 'react';
import classNames from 'classnames';

import { FORMUP_FORM_CLASS_NAME } from '../../constants/identifiers';
import FormContainer from '../../contexts/FormContext/FormContainer';

export interface FormProps {
  onSubmit?: (payload: any) => void,
  children?: React.ReactChild,
  formikForm: any,
  className?: any,
  renderAsDiv?: boolean,
}

/**
 * Form component that will make use of Formik to validate all inputs declared as its children.
 * The inputs should be enclosed by the FormInput component.
 */
const Form = ({
  renderAsDiv = false,
  formikForm,
  className,
  children,
  onSubmit,
}: FormProps) => {
  if (!formikForm) {
    throw new Error('You need to provide the "formikForm" prop.');
  }

  const formClassName = classNames(FORMUP_FORM_CLASS_NAME, className);

  return (
    <FormContainer form={formikForm}>
      {
        renderAsDiv
          ? (
            <div className={formClassName}>
              {children}
            </div>
          )
          : (
            <form onSubmit={onSubmit} className={formClassName}>
              {children}
            </form>
          )
      }
    </FormContainer>
  );
};

export default Form;
