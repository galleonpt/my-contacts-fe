import { Link } from 'react-router-dom';
import {
  Container, Header, ListContainer, Card, InputSearchContainer,
} from './styles';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import Modal from '../../components/Modal/Modal';

function Home() {
  return (
    <Container>
      <Modal danger />

      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar contacto ..." />
      </InputSearchContainer>

      <Header>
        <strong>3 contactos</strong>
        <Link to="/new">Novo contacto</Link>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>

            <img src={arrow} alt="Arrow" />
          </button>
        </header>

        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>Nome</strong>
              <small>instagram</small>
            </div>

            <span>email</span>
            <span>mobile number</span>
          </div>

          <div className="actions">
            <Link to="/edit/123">
              <img src={edit} alt="Edit" />
            </Link>

            <button type="button"><img src={trash} alt="Delete" /></button>
          </div>
        </Card>
      </ListContainer>
    </Container>
  );
}

export default Home;
