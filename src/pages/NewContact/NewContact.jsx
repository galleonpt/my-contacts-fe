import { useRef } from 'react';
import ContactsService from '../../services/ContactsService';
import PageHeader from '../../components/PageHeader/PageHeader';
import ContactForm from '../../components/ContactForm/ContactForm';
import toast from '../../utils/toast';

function NewContact() {
  const formRef = useRef(null);

  const handleSubmit = async (contact) => {
    try {
      await ContactsService.create(contact);

      formRef.current.resetFields();

      toast({
        type: 'success',
        text: 'Contact created successfully',
        duration: 3,
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Error creating contact',
      });
    }
  };

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
