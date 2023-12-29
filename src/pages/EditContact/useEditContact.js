import { useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';

const useEditContact = () => {
  const { id } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');
  const formRef = useRef(null);
  const safeAsyncAction = useSafeAsyncAction();

  //! handlers
  const handleSubmit = async (contact) => {
    try {
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
    const controller = new AbortController();

    async function fetchContact() {
      try {
        const response = await ContactsService.getById(id, controller.signal);

        safeAsyncAction(() => {
          formRef.current.setFieldsValues(response);
          setIsLoading(false);
          setName(response.name);
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        safeAsyncAction(() => {
          history.push('/');

          toast({
            type: 'danger',
            text: 'Contact not found!',
            duration: 3,
          });
        });
      } finally { setIsLoading(false); }
    }

    fetchContact();

    return () => {
      controller.abort();
    };
  }, [id, history, safeAsyncAction]);

  return {
    isLoading, name, formRef, handleSubmit,
  };
};

export default useEditContact;
