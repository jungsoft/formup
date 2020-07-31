import React from 'react';
import Grid from '@material-ui/core/Grid';
import { FormInput } from '@formup/core';

import TextFieldWithErrorMessage from './components/TextFieldWithErrorMessage';
import useStyles from './styles';

const FamilyMembersField = ({
  items,
  arrayHelpers,
}) => {
  const classes = useStyles();

  return (
    <>
      {items.map((item, index) => (
        <Grid container spacing={3} key={item.path}>
          <Grid item>
            <FormInput
              component={TextFieldWithErrorMessage}
              name={item.getPath('name')}
              injectFormupData
            />
          </Grid>

          <Grid item>
            <FormInput
              component={TextFieldWithErrorMessage}
              name={item.getPath('age')}
              injectFormupData
            />
          </Grid>

          <Grid item>
            <FormInput
              component={TextFieldWithErrorMessage}
              name={item.getPath('email')}
              injectFormupData
            />
          </Grid>

          <Grid item className={classes.arrayButton}>
            <button
              onClick={() => arrayHelpers.remove(index)}
              type="button"
            >
              -
            </button>
          </Grid>
        </Grid>
      ))}

      <button
        className={classes.marginTop2}
        type="button"
        onClick={() => arrayHelpers.push({
          name: 'John Foo clone',
          age: 10,
          email: 'foo@bar.com',
        })}
      >
        +
      </button>
    </>
  );
};

export default FamilyMembersField;
