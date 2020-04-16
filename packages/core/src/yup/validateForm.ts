import { ValidationError } from 'yup';

import {
  FormupYupSchema,
  ValidateFormOptions,
  ValidateFormResult,
  FormupFormikForm,
} from '../interfaces';
import defaultValidationOptions from '../constants/defaultValidationOptions';
import setFieldsTouched from '../utils/setFieldsTouched';

/**
 * Executes the form validation, and returns a summary of results.
 * @param schema Yup schema.
 * @param form Formik form.
 * @param paths Paths to be validated. Optional.
 */
const validateForm = (
  schema: FormupYupSchema,
  form: FormupFormikForm,
  options: ValidateFormOptions = defaultValidationOptions,
): ValidateFormResult => {
  const result: ValidateFormResult = {
    error: undefined,
    isValid: true,
  };

  let validatePaths: string[] = [];

  const {
    paths,
    ...validationOptions
  } = options;

  if (Array.isArray(paths) && paths.length > 0) {
    validatePaths = paths;
  } else if (typeof paths === 'string' || paths instanceof String) {
    validatePaths = [
      String(paths),
    ];
  }

  try {
    if (validatePaths.length > 0) {
      validatePaths.forEach((path) => {
        const pathObject = schema.fields[path];

        if (pathObject) {
          setFieldsTouched(form, pathObject.fields, path);
        }

        schema.validateSyncAt(
          path,
          form.values,
          validationOptions,
        );
      });
    } else {
      setFieldsTouched(form, schema.fields);

      schema.validateSync(
        form.values,
        validationOptions,
      );
    }
  } catch (error) {
    result.isValid = false;

    const exceptionError = error as ValidationError;

    if (exceptionError) {
      const formElements = exceptionError.inner
        .reduce((prev, acc) => ({
          ...prev,
          [acc.path]: [
            ...(prev[acc.path] || []),
            ...acc.errors,
          ],
        }), {});

      result.error = {
        ...exceptionError,
        formElements,
      };
    }
  }

  return result;
};

export default validateForm;
