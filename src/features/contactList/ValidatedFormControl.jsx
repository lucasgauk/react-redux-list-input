import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

const ValidatedFormControl = ({ errors, showAllErrors, onChange, onBlur, ...props }) => {
  const [isDirty, setIsDirty] = useState(false);
  const isInvalid = !!errors.length && (isDirty || showAllErrors)

  const handleChange = (event) => {
    onChange(event);
    setIsDirty(true);
  };

  const handleBlur = () => {
    onBlur();
    setIsDirty(true);
  }

  return (
    <>
      <Form.Control onChange={handleChange} onBlur={handleBlur} isInvalid={isInvalid} {...props} />
      {
        isInvalid && (
          errors.map(error => (
            <Form.Control.Feedback key={error} type="invalid">
              { error }
            </Form.Control.Feedback>
          ))
        )
      }
    </>
  );
}

ValidatedFormControl.propTypes = ({
  errors: PropTypes.array,
  showAllErrors: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
});

ValidatedFormControl.defaultProps = ({
  errors: [],
  showAllErrors: false,
  onChange: () => {},
  onBlur: () => {},
});

export default React.memo(ValidatedFormControl);
