import { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';

function ToastMessage({
  message, onRemoveMessage, isLeaving, animatedRef,
}) {
  const {
    id, type, text, duration,
  } = message;

  // ! handlers
  const handleRemoveToast = () => {
    onRemoveMessage(id);
  };

  // ! effects
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(id);
    }, (duration || 7) * 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [id, duration, onRemoveMessage]);

  // ! render
  return (
    <Container
      type={type}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
      $isLeaving={isLeaving}
      ref={animatedRef}
    >
      {type === 'danger' && <img src={xCircleIcon} alt="X" />}
      {type === 'success' && <img src={checkCircleIcon} alt="check" />}
      <strong>{text}</strong>
    </Container>
  );
}

export default memo(ToastMessage);

ToastMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'danger', 'success']),
    duration: PropTypes.number,
  }).isRequired,

  animatedRef: PropTypes.shape().isRequired,
  isLeaving: PropTypes.bool.isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
};
