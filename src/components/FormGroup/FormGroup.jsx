import PropTypes from 'prop-types';
import { Container } from './styles';

function FormGroup({ children }) {
  return (
    <Container>
      {children}
    </Container>
  );
}

export default FormGroup;

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
};
