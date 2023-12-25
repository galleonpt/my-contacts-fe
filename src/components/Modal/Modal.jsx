import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, Container, Footer } from './styles';
import Button from '../Button/Button';

function Modal({
  danger,
  open,
  isLoading,
  title,
  children,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
}) {
  if (!open) {
    return null;
  }

  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>{title}</h1>

        <div className="body">
          {children}
        </div>

        <Footer>
          <button
            type="button"
            className="cancel_btn"
            disabled={isLoading}
            onClick={onCancel}
          >
            {cancelLabel}
          </button>

          <Button
            type="button"
            danger={danger}
            isLoading={isLoading}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('modal-root'),
  );
}

export default Modal;

Modal.propTypes = {
  danger: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  danger: false,
  isLoading: false,
  cancelLabel: 'Cancel',
  confirmLabel: 'Confirm',
};
