import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { Overlay, Container, Footer } from './styles';
import Button from '../Button/Button';
import ReactPortal from '../ReactPortal/ReactPortal';

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
  const [shouldRender, setShouldRender] = useState(open);
  const overlayRef = useRef(null);

  // ! effects
  useEffect(() => {
    const handleAnimationEnd = () => {
      setShouldRender(false);
    };

    if (open) {
      setShouldRender(true);
    }

    const overlayRefElement = overlayRef.current;
    if (!open && overlayRefElement) {
      overlayRefElement.addEventListener('animationend', handleAnimationEnd);
    }

    return () => {
      if (overlayRefElement) {
        overlayRefElement.removeEventListener('animationend', handleAnimationEnd);
      }
    };
  }, [open]);

  // ! render
  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId="modal-root">
      <Overlay isLeaving={!open} ref={overlayRef}>
        <Container danger={danger} isLeaving={!open}>
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
      </Overlay>
    </ReactPortal>
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
