import PageHeader from '../../components/PageHeader/PageHeader';
import ContactForm from '../../components/ContactForm/ContactForm';
import Loader from '../../components/Loader/Loader';
import useEditContact from './useEditContact';

function Edit() {
  const {
    isLoading, name, formRef, handleSubmit,
  } = useEditContact();

  // ! render
  return (
    <>
      <Loader isLoading={isLoading} />

      <PageHeader
        title={isLoading ? 'Loading...' : `Edit ${name}`}
      />

      <ContactForm
        ref={formRef}
        buttonLabel="Save changes"
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default Edit;
