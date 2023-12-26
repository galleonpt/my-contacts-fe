import {
  useState, useEffect, useImperativeHandle,
} from 'react';
import useErrors from '../../hooks/useErrors';
import useSafeAsyncState from '../../hooks/useSafeAsyncState';

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';

import CategoriesService from '../../services/CategoriesService';

const useContactForm = (formRef, onSubmit) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useSafeAsyncState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    errors, getErrorByField, removeError, setError,
  } = useErrors();

  const isFormValid = (name && !errors.length);

  useImperativeHandle(formRef, () => ({
    setFieldsValues: (contact) => {
      setName(contact.name ?? '');
      setEmail(contact.email ?? '');
      setPhone(formatPhone(contact.phone ?? ''));
      setCategoryId(contact.category.id ?? '');
    },
    resetFields: () => {
      setName('');
      setEmail('');
      setPhone('');
      setCategoryId('');
    },
  }), []);

  // ! handlers
  const handleNameChange = (event) => {
    setName(event.target.value);

    if (!event.target.value) {
      setError({
        field: 'name',
        message: 'Name is required!',
      });
    } else {
      removeError('name');
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError(
        { field: 'email', message: 'Invalid email!' },
      );
    } else {
      removeError('email');
    }
  };

  const handlePhoneChange = (event) => {
    setPhone(formatPhone(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    await onSubmit({
      name, email, phone, categoryId,
    });

    setIsSubmitting(false);
  };

  // ! effects
  useEffect(() => {
    async function fetchCategories() {
      try {
        setIsLoadingCategories(true);
        const categoriesList = await CategoriesService.list();
        setCategories(categoriesList);
      } catch {} finally {
        setIsLoadingCategories(false);
      }
    }

    fetchCategories();
  }, [setCategories, setIsLoadingCategories]);

  return {
    isSubmitting,
    isFormValid,

    name,
    phone,
    email,

    categoryId,
    setCategoryId,
    categories,
    isLoadingCategories,

    getErrorByField,

    handleNameChange,
    handleSubmit,
    handlePhoneChange,
    handleEmailChange,
  };
};

export default useContactForm;
