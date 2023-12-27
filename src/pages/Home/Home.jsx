import { Container } from './styles';

import Loader from '../../components/Loader/Loader';
import useHome from './useHome';
import InputSearch from './components/InputSearch/InputSearch';
import Header from './components/Header/Header';
import ErrorStatus from './components/ErrorStatus/ErrorStatus';
import EmptyList from './components/EmptyList/EmptyList';
import SearchNotFound from './components/SearchNotFound/SearchNotFound';
import ContactsList from './components/ContactsList/ContactsList';
import Modal from '../../components/Modal/Modal';

function Home() {
  const {
    isLoading,
    isDeleteModalOpen,
    isDeleteLoading,
    hasError,

    contacts,
    filteredContacts,
    contactToDelete,
    searchName,
    orderBy,

    handleCloseDeleteContact,
    handleConfirmDeleteContact,
    handleChangeSearchName,
    handleTryAgain,
    handleToggleOrderBy,
    handleDeleteContact,
  } = useHome();

  const hasContacts = contacts.length > 0;
  const isListEmpty = !hasError && !isLoading && !hasContacts;
  const isSearchEmpty = !hasError && hasContacts && filteredContacts.length === 0;

  // ! render
  return (
    <Container>

      <Loader isLoading={isLoading} />

      {hasContacts && (
        <InputSearch value={searchName} onChange={handleChangeSearchName} />
      )}

      <Header
        hasError={hasError}
        contactsLength={contacts.length}
        filteredContactsLength={filteredContacts.length}
      />

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}
      {isListEmpty && <EmptyList />}
      {isSearchEmpty && <SearchNotFound searchName={searchName} />}

      {hasContacts && (
        <>
          <ContactsList
            isDeleteModalOpen={isDeleteModalOpen}
            isDeleteLoading={isDeleteLoading}
            filteredContacts={filteredContacts}
            contactToDelete={contactToDelete}
            orderBy={orderBy}
            onCloseDeleteContact={handleCloseDeleteContact}
            onConfirmDeleteContact={handleConfirmDeleteContact}
            onToggleOrderBy={handleToggleOrderBy}
            onDeleteContact={handleDeleteContact}
          />

          <Modal
            danger
            open={isDeleteModalOpen}
            isLoading={isDeleteLoading}
            title={`Are you sure you want to delete "${contactToDelete?.name}"?`}
            confirmLabel="Delete"
            onCancel={handleCloseDeleteContact}
            onConfirm={handleConfirmDeleteContact}
          >
            <p>This action cannot be undone.</p>
          </Modal>
        </>
      )}

    </Container>
  );
}

export default Home;
