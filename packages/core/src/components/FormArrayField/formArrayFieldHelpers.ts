import getFieldDefaultValue from '../../utils/getFieldDefaultValue';
import getFieldValue from '../../utils/getFieldValue';
import { FormupFormikForm } from '../../interfaces';

/**
 * Base helpers for FormArrayField.
 */
const formArrayFieldHelpers = {
  /**
   * Pushes a new item into the array.
   */
  push: (
    form: FormupFormikForm,
    name: string,
    value?: any,
  ) => {
    const arrayValue = getFieldValue(name, form) || [];

    let itemValue = value;

    if (itemValue === undefined) {
      itemValue = getFieldDefaultValue(name, form?.schema, {
        returnSubtype: true,
      });
    }

    const newValue = [
      ...arrayValue,
      itemValue,
    ];

    form.setFieldValue(name, newValue);
  },

  /**
   * Removes one item from the array, if it exists.
   */
  remove: (
    form: FormupFormikForm,
    name: string,
    index: number,
  ) => {
    const arrayValue = getFieldValue(name, form) || [];

    const hasValueAtIndex = (
      index >= 0
      && index <= (arrayValue?.length - 1)
    );

    if (!hasValueAtIndex) {
      return;
    }

    const newValue = arrayValue.filter((_value: any, i: number) => index !== i);

    form.setFieldValue(name, newValue);
  },
};

export default formArrayFieldHelpers;
