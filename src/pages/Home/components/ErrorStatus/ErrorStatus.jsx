import PropTypes from 'prop-types';
import Button from '../../../../components/Button/Button';
import sad from '../../../../assets/images/sad.svg';
import { Container } from './styles';

function ErrorStatus({ onTryAgain }) {
  return (
    <Container>
      <img src={sad} alt="sad" />

      <div className="details">
        <strong>Error getting your contacts!</strong>

        <Button type="button" onClick={onTryAgain}>
          Try again
        </Button>
      </div>
    </Container>
  );
}

export default ErrorStatus;

ErrorStatus.propTypes = {
  onTryAgain: PropTypes.func.isRequired,
};
