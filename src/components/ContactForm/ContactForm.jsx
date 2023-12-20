import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useErrors from '../../hooks/useErrors';

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';

import CategoriesService from '../../services/CategoriesService';

import FormGroup from '../FormGroup/FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import { Form, ButtonContainer } from './styles';

function ContactForm({ buttonLabel, onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  const {
    errors, getErrorByField, removeError, setError,
  } = useErrors();

  const isFormValid = (name && !errors.length);

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
        { field: 'email', message: 'Invalid email' },
      );
    } else {
      removeError('email');
    }
  };

  const handlePhoneChange = (event) => {
    setPhone(formatPhone(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      name, email, phone, categoryId,
    });
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
  }, []);

  // ! render
  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorByField('name')}>
        <Input
          value={name}
          placeholder="Name *"
          error={getErrorByField('name')}
          onChange={handleNameChange}
        />
      </FormGroup>

      <FormGroup error={getErrorByField('email')}>
        <Input
          type="email"
          value={email}
          placeholder="Email"
          error={getErrorByField('email')}
          onChange={handleEmailChange}
        />
      </FormGroup>

      <FormGroup error={getErrorByField('phone')}>
        <Input
          value={phone}
          placeholder="Phone"
          maxLength={9}
          error={getErrorByField('phone')}
          onChange={handlePhoneChange}
        />
      </FormGroup>

      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          disabled={isLoadingCategories}
        >
          <option value="">No category</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid}>
          {buttonLabel}
        </Button>
      </ButtonContainer>

    </Form>
  );
}

export default ContactForm;

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
