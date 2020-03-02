import defaultValidationOptions from '../constants/defaultValidationOptions';
import setFieldsTouched from '../utils/setFieldsTouched';
import { YupSchema, ValidateFormOptions } from './types';

/**
 * Executes the form validation, and returns a summary of results.
 * @param schema Yup schema.
 * @param form Formik form.
 * @param paths Paths to be validated. Optional.
 */
const validateForm = (
  schema: YupSchema,
  form: any,
  options: ValidateFormOptions = defaultValidationOptions,
) => {
  const result = {
    isValid: true,
    errors: [],
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
    result.errors = error.errors;
    result.isValid = false;
  }

  return result;
};

export default validateForm;
