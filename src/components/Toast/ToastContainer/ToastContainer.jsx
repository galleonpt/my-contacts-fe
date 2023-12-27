import { useEffect } from 'react';
import ToastMessage from '../ToastMessage/ToastMessage';
import { Container } from './styles';
import { toastEventManager } from '../../../utils/toast';
import useAnimatedList from '../../../hooks/useAnimatedList';

function ToastContainer() {
  const {
    items: messages,
    setItems: setMessages,
    pendingRemovalItemsIds: pendingRemovalMessagesIds,
    handleAnimationEnd,
    handleRemoveItem: handleRemoveMessage,
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
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          isLeaving={pendingRemovalMessagesIds.includes(message.id)}
          onRemoveMessage={handleRemoveMessage}
          onAnimationEnd={handleAnimationEnd}
        />
      ))}
    </Container>
  );
}

export default ToastContainer;
