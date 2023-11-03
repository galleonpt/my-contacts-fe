import {
  Container, Header, ListContainer, Card,
} from './styles';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

export default function ContactsList() {
  return (
    <Container>
      <Header>
        <strong>3 contactos</strong>
        <a href="/">Novo contacto</a>
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
            <a href="/">
              <img src={edit} alt="Edit" />
            </a>

            <button type="button"><img src={trash} alt="Delete" /></button>
          </div>
        </Card>

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
            <a href="/">
              <img src={edit} alt="Edit" />
            </a>

            <button type="button"><img src={trash} alt="Delete" /></button>
          </div>
        </Card>

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
            <a href="/">
              <img src={edit} alt="Edit" />
            </a>

            <button type="button"><img src={trash} alt="Delete" /></button>
          </div>
        </Card>

      </ListContainer>
    </Container>
  );
}
