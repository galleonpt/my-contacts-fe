import { useState } from 'react';
import PropTypes from 'prop-types';
import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';
import { Form, ButtonContainer } from './styles';
import FormGroup from '../FormGroup/FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import useErrors from '../../hooks/useErrors';

function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');

  const {
    errors, getErrorByField, removeError, setError,
  } = useErrors();

  const isFormValid = (name && !errors.length);

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
  };

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

      <FormGroup>
        <Select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="instagram">Instagram</option>
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
};
