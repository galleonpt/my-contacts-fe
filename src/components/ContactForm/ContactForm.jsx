import { useState } from 'react';
import PropTypes from 'prop-types';
import isEmailValid from '../../utils/isEmailValid';
import { Form, ButtonContainer } from './styles';
import FormGroup from '../FormGroup/FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState([]);

  const handleNameChange = (event) => {
    setName(event.target.value);

    if (!event.target.value) {
      setErrors((prevState) => [
        ...prevState,
        { field: 'name', message: 'Name is required' },
      ]);
    } else {
      setErrors((prevState) => prevState.filter(
        (error) => error.field !== 'name',
      ));
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      const errorAlreadExist = errors.find((error) => error.field === 'email');

      if (errorAlreadExist) return;

      setErrors((prevState) => [
        ...prevState,
        { field: 'email', message: 'Invalid email' },
      ]);
    } else {
      setErrors((prevState) => prevState.filter(
        (error) => error.field !== 'email',
      ));
    }
  };

  console.log(errors);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Input
          value={name}
          placeholder="Name"
          onChange={handleNameChange}
        />
      </FormGroup>

      <FormGroup>
        <Input
          value={email}
          placeholder="Email"
          onChange={handleEmailChange}
        />
      </FormGroup>

      <FormGroup>
        <Input
          value={phone}
          placeholder="Phone"
          onChange={(event) => setPhone(event.target.value)}
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
        <Button type="submit">
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
