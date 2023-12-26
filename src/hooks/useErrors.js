import { useState, useCallback } from 'react';

const useErrors = () => {
  const [errors, setErrors] = useState([]);

  const setError = useCallback(({ field, message }) => {
    const errorAlreadExist = errors.find((error) => error.field === field);

    if (errorAlreadExist) return;

    setErrors((prevState) => [
      ...prevState,
      { field, message },
    ]);
  }, [errors]);

  const removeError = useCallback((field) => {
    setErrors((prevState) => prevState.filter(
      (error) => error.field !== field,
    ));
  }, []);

  const getErrorByField = useCallback(
    (field) => errors.find((error) => error.field === field)?.message,
    [errors],
  );

  return {
    errors, setError, removeError, getErrorByField,
  };
};

export default useErrors;
