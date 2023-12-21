import ToastMessage from '../ToastMessage/ToastMessage';
import { Container } from './styles';

function ToastContainer() {
  return (
    <Container>
      <ToastMessage text="Default message" />
      <ToastMessage text="Error toast" type="danger" />
      <ToastMessage text="Success toast" type="success" />
    </Container>
  );
}

export default ToastContainer;
