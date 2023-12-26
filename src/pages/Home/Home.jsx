import { Link } from 'react-router-dom';
import {
  Container,
  ListHeader,
  Card,
  SearchNotFoundContainer,
} from './styles';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';

import Loader from '../../components/Loader/Loader';
import Modal from '../../components/Modal/Modal';
import useHome from './useHome';
import InputSearch from './components/InputSearch/InputSearch';
import Header from './components/Header/Header';
import ErrorStatus from './components/ErrorStatus/ErrorStatus';
import EmptyList from './components/EmptyList/EmptyList';

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

  // ! render
  return (
    <Container>
      {isLoading && <Loader />}

      {contacts.length > 0 && (
        <InputSearch value={searchName} onChange={handleChangeSearchName} />
      )}

      <Header
        hasError={hasError}
        contactsLength={contacts.length}
        filteredContactsLength={filteredContacts.length}
      />

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}

      {!hasError && (
        <>
          {contacts.length === 0 && !isLoading && (
            <EmptyList />
          )}

          {contacts.length > 0 && filteredContacts.length === 0 && (
          <SearchNotFoundContainer>
            <img src={magnifierQuestion} alt="magnifier-question" />

            <span>
              No results were found for
              {' '}
              <strong>{searchName}</strong>
              .
            </span>
          </SearchNotFoundContainer>
          )}

          {filteredContacts.length > 0 && (
          <ListHeader orderBy={orderBy}>
            <button type="button" onClick={handleToggleOrderBy}>
              <span>Name</span>

              <img src={arrow} alt="Arrow" />
            </button>
          </ListHeader>
          )}

          {filteredContacts.map((contact) => (
            <Card key={contact.id}>
              <div className="info">
                <div className="contact-name">
                  <strong>{contact.name}</strong>
                  { contact.category.name && <small>{contact.category.name}</small> }
                </div>

                <span>{contact.email}</span>
                <span>{contact.phone}</span>
              </div>

              <div className="actions">
                <Link to={`/edit/${contact.id}`}>
                  <img src={edit} alt="Edit" />
                </Link>

                <button type="button" onClick={() => handleDeleteContact(contact)}>
                  <img src={trash} alt="Delete" />
                </button>
              </div>
            </Card>
          ))}

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
