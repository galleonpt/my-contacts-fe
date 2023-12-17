import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Header, ListHeader, Card, InputSearchContainer,
} from './styles';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import Loader from '../../components/Loader/Loader';
import ContactsService from '../../services/ContactsService';

function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchName, setSearchName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchName.toLowerCase())
  )), [searchName, contacts]);

  // ! effects
  useEffect(() => {
    async function fetchContacts() {
      try {
        setIsLoading(true);

        const contactsList = await ContactsService.list(orderBy);

        setContacts(contactsList);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchContacts();
  }, [orderBy]);

  // ! handlers
  const handleToggleOrderBy = () => {
    setOrderBy((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleChangeSearchName = (event) => {
    setSearchName(event.target.value);
  };

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

      <Header>
        <strong>
          {filteredContacts.length}
          {filteredContacts.length === 1 ? ' contact' : ' contacts'}
        </strong>
        <Link to="/new">New contact</Link>
      </Header>

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

    </Container>
  );
}

export default Home;
