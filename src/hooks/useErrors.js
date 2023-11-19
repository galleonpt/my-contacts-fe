import { useState } from 'react';

const useErrors = () => {
  const [errors, setErrors] = useState([]);

  const setError = ({ field, message }) => {
    const errorAlreadExist = errors.find((error) => error.field === field);

    if (errorAlreadExist) return;

    setErrors((prevState) => [
      ...prevState,
      { field, message },
    ]);
  };

  const removeError = (field) => {
    setErrors((prevState) => prevState.filter(
      (error) => error.field !== field,
    ));
  };

  const getErrorByField = (field) => errors.find((error) => error.field === field)?.message;

  return {
    errors, setError, removeError, getErrorByField,
  };
};

export default useErrors;
