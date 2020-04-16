import React from 'react';
import classNames from 'classnames';

import { FORMUP_FORM_CLASS_NAME } from '../../constants/identifiers';
import FormContainer from '../../contexts/FormContext/FormContainer';
import { FormupFormikForm } from '../../interfaces';

export interface FormProps {
  onSubmit?: (payload: any) => void,
  children?: React.ReactChild,
  formikForm: FormupFormikForm,
  className?: any,
  renderAsForm?: boolean,
}

/**
 * Form component that will make use of Formik to validate all inputs declared as its children.
 * The inputs should be enclosed by the FormInput component.
 */
const Form = ({
  renderAsForm = false,
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
        renderAsForm
          ? (
            <form onSubmit={onSubmit} className={formClassName}>
              {children}
            </form>
          )
          : (
            <div className={formClassName}>
              {children}
            </div>
          )
      }
    </FormContainer>
  );
};

export default Form;
