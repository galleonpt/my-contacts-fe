import {
  useEffect, useState, useMemo, useCallback,
} from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Header, ListHeader, Card, InputSearchContainer, ErrorContainer,
} from './styles';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/sad.svg';

import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button';
import ContactsService from '../../services/ContactsService';

function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchName, setSearchName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchName.toLowerCase())
  )), [searchName, contacts]);

  // ! handlers
  const fetchContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.list(orderBy);

      setContacts(contactsList);
      setHasError(false);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  const handleToggleOrderBy = () => {
    setOrderBy((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleChangeSearchName = (event) => {
    setSearchName(event.target.value);
  };

  const handleTryAgain = () => {
    fetchContacts();
  };

  // ! effects
  useEffect(() => {
    fetchContacts();
  }, [orderBy, fetchContacts]);

  // ! render
  return (
    <Container>
      {isLoading && <Loader />}

      <InputSearchContainer>
        <input
          value={searchName}
          type="text"
          placeholder="Find Contact ..."
          onChange={handleChangeSearchName}
        />
      </InputSearchContainer>

      <Header hasError={hasError}>
        {!hasError && (
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
                  { contact.category_name && <small>{contact.category_name}</small> }
                </div>

                <span>{contact.email}</span>
                <span>{contact.phone}</span>
              </div>

              <div className="actions">
                <Link to={`/edit/${contact.id}`}>
                  <img src={edit} alt="Edit" />
                </Link>

                <button type="button"><img src={trash} alt="Delete" /></button>
              </div>
            </Card>
          ))}
        </>
      )}

    </Container>
  );
}

export default Home;
