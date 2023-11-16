import PageHeader from '../../components/PageHeader/PageHeader';
import ContactForm from '../../components/ContactForm/ContactForm';

function NewContact() {
  return (
    <>
      <PageHeader
        title="Novo contacto"
      />

      <ContactForm buttonLabel="Criar contacto" />

    </>
  );
}

export default NewContact;
