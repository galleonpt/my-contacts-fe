import PropTypes from 'prop-types';
import { Overlay, Container, Footer } from './styles';
import Button from '../Button';

function Modal({ danger }) {
  return (
    <Overlay>
      <Container danger={danger}>
        <h1>titulo</h1>
        <p>description</p>

        <Footer>
          <button type="button" className="cancel_btn">Cancelar</button>

          <Button type="button" danger={danger}>Apagar</Button>
        </Footer>
      </Container>
    </Overlay>
  );
}

export default Modal;

Modal.propTypes = {
  danger: PropTypes.bool,
};

Modal.defaultProps = {
  danger: false,
};
