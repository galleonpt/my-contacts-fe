import PageHeader from '../../components/PageHeader/PageHeader';
import ContactForm from '../../components/ContactForm/ContactForm';
import useNewContact from './useNewContact';

function NewContact() {
  const {
    formRef,
    handleSubmit,
  } = useNewContact();

  return (
    <>
      <PageHeader
        title="New Contact"
      />

      <ContactForm
        ref={formRef}
        buttonLabel="Create contact"
        onSubmit={handleSubmit}
      />

    </>
  );
}

export default NewContact;
