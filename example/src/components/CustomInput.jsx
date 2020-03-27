import React from 'react';
import PropTypes from 'prop-types';

const CustomInput = ({
  error, // Yup validation error
  title, // Custom property
  ...props
}) => (
  <div>
    <p>
      {title}
    </p>

    {
      error && (
        <p className="custom-input-error-label">
          {`Yup error: ${error}`}
        </p>
      )
    }

    <input {...props} />
  </div>
);

CustomInput.propTypes = {
  error: PropTypes.string,
  title: PropTypes.string,
};

CustomInput.defaultProps = {
  error: null,
  title: null,
};

export default CustomInput;
