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
  const [name, setName] = useState('');
  const formRef = useRef(null);

  //! handlers
  const handleSubmit = async (formData) => {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

      const response = await ContactsService.update(id, contact);
      setName(response.name);

      toast({
        type: 'success',
        text: 'Contact updated successfully',
        duration: 3,
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Error updating contact',
      });
    }
  };

  // ! effects
  useEffect(() => {
    async function fetchContact() {
      try {
        const response = await ContactsService.getById(id);

        setIsLoading(false);
        formRef.current.setFieldsValues(response);
        setName(response.name);
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
