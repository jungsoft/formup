import React from 'react';

import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const CustomInput = ({
  title, // Custom property
  ...props
}) => (
  <div>
    <TextField label={title} {...props} />
  </div>
);

CustomInput.propTypes = {
  title: PropTypes.string,
};

CustomInput.defaultProps = {
  title: null,
};

export default CustomInput;
