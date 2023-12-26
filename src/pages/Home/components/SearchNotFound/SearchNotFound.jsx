/* eslint-disable react/jsx-one-expression-per-line */
import PropTypes from 'prop-types';
import magnifierQuestion from '../../../../assets/images/magnifier-question.svg';
import { Container } from './styles';

function SearchNotFound({ searchName }) {
  return (
    <Container>
      <img src={magnifierQuestion} alt="magnifier-question" />

      <span>
        No results were found for <strong>{searchName}</strong>.
      </span>
    </Container>
  );
}

export default SearchNotFound;

SearchNotFound.propTypes = {
  searchName: PropTypes.string.isRequired,
};
