import { useEffect } from 'react';
import ToastMessage from '../ToastMessage/ToastMessage';
import { Container } from './styles';
import { toastEventManager } from '../../../utils/toast';
import useAnimatedList from '../../../hooks/useAnimatedList';

function ToastContainer() {
  const {
    setItems: setMessages,
    handleRemoveItem: handleRemoveMessage,
    renderList,
  } = useAnimatedList();

  // ! effects
  useEffect(() => {
    const handleAddToast = ({ type, text, duration }) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random(), text, type, duration,
        },
      ]);
    };

    toastEventManager.on('addtoast', handleAddToast);

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, [setMessages]);

  // ! render
  return (
    <Container>
      {renderList((message, { isLeaving, animatedRef }) => (
        <ToastMessage
          key={message.id}
          message={message}
          isLeaving={isLeaving}
          onRemoveMessage={handleRemoveMessage}
          animatedRef={animatedRef}
        />
      ))}
    </Container>
  );
}

export default ToastContainer;
