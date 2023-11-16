import PageHeader from '../../components/PageHeader/PageHeader';
import ContactForm from '../../components/ContactForm/ContactForm';

function Edit() {
  return (
    <>
      <PageHeader
        title="Editar XPTO"
      />

      <ContactForm buttonLabel="Guardar alterações" />
    </>
  );
}

export default Edit;
