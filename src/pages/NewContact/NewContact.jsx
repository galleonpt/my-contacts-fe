import ContactsServive from '../../services/ContactsService';
import PageHeader from '../../components/PageHeader/PageHeader';
import ContactForm from '../../components/ContactForm/ContactForm';

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
    } catch (error) {
      alert(error);
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
