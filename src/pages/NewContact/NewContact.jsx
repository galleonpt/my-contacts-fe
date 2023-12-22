import ContactsServive from '../../services/ContactsService';
import PageHeader from '../../components/PageHeader/PageHeader';
import ContactForm from '../../components/ContactForm/ContactForm';
import toast from '../../utils/toast';

function NewContact() {
  const handleSubmit = async (formData) => {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

      await ContactsServive.create(contact);

      toast({
        type: 'success',
        text: 'Contact created successfully',
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
        buttonLabel="Create contact"
        onSubmit={handleSubmit}
      />

    </>
  );
}

export default NewContact;
