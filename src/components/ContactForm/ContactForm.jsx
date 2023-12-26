import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import FormGroup from '../FormGroup/FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button/Button';
import useContactForm from './useContactForm';

import { Form, ButtonContainer } from './styles';

const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const {
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
  } = useContactForm(ref, onSubmit);

  // ! render
  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorByField('name')}>
        <Input
          value={name}
          placeholder="Name *"
          disabled={isSubmitting}
          error={getErrorByField('name')}
          onChange={handleNameChange}
        />
      </FormGroup>

      <FormGroup error={getErrorByField('email')}>
        <Input
          type="email"
          value={email}
          placeholder="Email"
          disabled={isSubmitting}
          error={getErrorByField('email')}
          onChange={handleEmailChange}
        />
      </FormGroup>

      <FormGroup error={getErrorByField('phone')}>
        <Input
          value={phone}
          placeholder="Phone"
          maxLength={9}
          disabled={isSubmitting}
          error={getErrorByField('phone')}
          onChange={handlePhoneChange}
        />
      </FormGroup>

      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          disabled={isLoadingCategories || isSubmitting}
        >
          <option value="">No category</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button
          type="submit"
          disabled={!isFormValid}
          isLoading={isSubmitting}
        >
          {buttonLabel}
        </Button>
      </ButtonContainer>

    </Form>
  );
});

export default ContactForm;

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
