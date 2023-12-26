import PropTypes from 'prop-types';
import { Container } from './styles';

function InputSearch({ value, onChange }) {
  return (
    <Container>
      <input
        value={value}
        type="text"
        placeholder="Search contact by name ..."
        onChange={onChange}
      />
    </Container>
  );
}

export default InputSearch;

InputSearch.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
