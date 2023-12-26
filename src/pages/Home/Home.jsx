/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-nested-ternary */

import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  ListHeader,
  Card,
  InputSearchContainer,
  ErrorContainer,
  EmptyListContainer,
  SearchNotFoundContainer,
} from './styles';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';

import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import useHome from './useHome';

function Home() {
  const {
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
  } = useHome();

  // ! render
  return (
    <Container>
      {isLoading && <Loader />}

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

      {contacts.length > 0 && (
        <InputSearchContainer>
          <input
            value={searchName}
            type="text"
            placeholder="Search contact by name ..."
            onChange={handleChangeSearchName}
          />
        </InputSearchContainer>
      )}

      <Header
        justifyContent={
            hasError
              ? 'flex-end'
              : contacts.length > 0
                ? 'space-between'
                : 'center'
        }
      >
        {!hasError && contacts.length > 0 && (
        <strong>
          {filteredContacts.length}
          {filteredContacts.length === 1 ? ' contact' : ' contacts'}
        </strong>
        )}
        <Link to="/new">New contact</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="sad" />

          <div className="details">
            <strong>Error getting your contacts!</strong>

            <Button type="button" onClick={handleTryAgain}>
              Try again
            </Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>
          {contacts.length === 0 && !isLoading && (
          <EmptyListContainer>
            <img src={emptyBox} alt="empty-box" />

            <div>
              <p>
                You don't have any registered contacts yet!
                Click on the <strong>“New Contact”</strong>
                button at the top to register your first one!
              </p>
            </div>
          </EmptyListContainer>
          )}

          {contacts.length > 0 && filteredContacts.length === 0 && (
          <SearchNotFoundContainer>
            <img src={magnifierQuestion} alt="magnifier-question" />

            <span>No results were found for <strong>{searchName}</strong>.</span>
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
        </>
      )}

    </Container>
  );
}

export default Home;
