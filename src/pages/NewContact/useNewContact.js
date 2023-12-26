import { useRef } from 'react';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

const useNewContact = () => {
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

  return {
    formRef,
    handleSubmit,
  };
};

export default useNewContact;
