import { Overlay, Container, Footer } from './styles';
import Button from '../Button';

function Modal() {
  return (
    <Overlay>
      <Container>
        <h1>titulo</h1>
        <p>description</p>

        <Footer>
          <button type="button" className="cancel_btn">Cancelar</button>

          <Button type="button">Apagar</Button>
        </Footer>
      </Container>
    </Overlay>
  );
}

export default Modal;
