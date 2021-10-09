import React, { useState } from 'react';
import { makeStyles } from '@mui/material';

export function useForm(
  initialFValues = {},
  validateOnChange = false,
  validate
) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setValues({
      ...values,
      [name]: (files && files[0]) || value,
    });
    if (validateOnChange) validate({ [name]: value });
  };
  const setValue = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange) validate({ [name]: value });
  };

  const resetForm = (v = initialFValues) => {
    setValues(v);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
    setValue,
  };
}
