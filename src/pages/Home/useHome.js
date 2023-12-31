import {
  useEffect, useState, useMemo, useCallback, useDeferredValue,
} from 'react';
import ContactsService from '../../services/ContactsService';

import toast from '../../utils/toast';

const useHome = () => {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchName, setSearchName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const deferredSearchName = useDeferredValue(searchName);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(deferredSearchName.toLowerCase())
  )), [contacts, deferredSearchName]);

  // ! handlers
  const fetchContacts = useCallback(async (signal) => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.list(orderBy, signal);

      setContacts(contactsList);
      setHasError(false);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }

      setHasError(true);
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  const handleToggleOrderBy = useCallback(() => {
    setOrderBy((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  }, []);

  const handleChangeSearchName = (event) => {
    setSearchName(event.target.value);
  };

  const handleTryAgain = () => {
    fetchContacts();
  };

  const handleDeleteContact = useCallback((contact) => {
    setContactToDelete(contact);
    setIsDeleteModalOpen(true);
  }, []);

  const handleCloseDeleteContact = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDeleteContact = async () => {
    try {
      setIsDeleteLoading(true);
      await ContactsService.delete(contactToDelete.id);

      setContacts((prev) => prev.filter((contact) => contact.id !== contactToDelete.id));

      handleCloseDeleteContact();

      toast({
        type: 'success',
        text: 'Contact deleted successfully',
        duration: 3,
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Error deleting contact',
        duration: 3,
      });
    } finally { setIsDeleteLoading(false); }
  };

  // ! effects
  useEffect(() => {
    const controller = new AbortController();
    fetchContacts(controller.signal);

    return () => {
      controller.abort();
    };
  }, [orderBy, fetchContacts]);

  return {
    isLoading,
    isDeleteModalOpen,
    isDeleteLoading,
    hasError,

    contacts,
    contactToDelete,
    searchName,
    filteredContacts,
    orderBy,

    handleCloseDeleteContact,
    handleConfirmDeleteContact,
    handleChangeSearchName,
    handleTryAgain,
    handleToggleOrderBy,
    handleDeleteContact,
  };
};

export default useHome;
