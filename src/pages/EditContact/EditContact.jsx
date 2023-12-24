import { useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader/PageHeader';
import ContactForm from '../../components/ContactForm/ContactForm';
import ContactsService from '../../services/ContactsService';
import Loader from '../../components/Loader/Loader';
import toast from '../../utils/toast';

function Edit() {
  const { id } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const formRef = useRef(null);

  //! handlers
  const handleSubmit = () => {
    //
  };

  // ! effects
  useEffect(() => {
    async function fetchContact() {
      try {
        const response = await ContactsService.getById(id);

        setIsLoading(false);
        formRef.current.setFieldsValues(response);
      } catch (error) {
        history.push('/');

        toast({
          type: 'danger',
          text: error.message,
          duration: 3,
        });
      } finally { setIsLoading(false); }
    }

    fetchContact();
  }, [id, history]);

  // ! render
  return (
    <>
      {isLoading && <Loader />}

      <PageHeader
        title="Editar XPTO"
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
