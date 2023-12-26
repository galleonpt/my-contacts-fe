/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container } from './styles';

function Header({ hasError, contactsLength, filteredContactsLength }) {
  const alignement = hasError
    ? 'flex-end'
    : contactsLength > 0
      ? 'space-between'
      : 'center';

  return (
    <Container justifyContent={alignement}>
      {!hasError && contactsLength > 0 && (
      <strong>
        {filteredContactsLength}
        {filteredContactsLength === 1 ? ' contact' : ' contacts'}
      </strong>
      )}
      <Link to="/new">New contact</Link>
    </Container>
  );
}

export default Header;

Header.propTypes = {
  hasError: PropTypes.bool.isRequired,
  contactsLength: PropTypes.number.isRequired,
  filteredContactsLength: PropTypes.number.isRequired,
};
