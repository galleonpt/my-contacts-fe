import { useState, useEffect, useCallback } from 'react';
import ToastMessage from '../ToastMessage/ToastMessage';
import { Container } from './styles';
import { toastEventManager } from '../../../utils/toast';

function ToastContainer() {
  const [messages, setMessages] = useState([]);
  const [pendingRemovalMessagesIds, setPendingRemovalMessagesIds] = useState([]);

  // ! handlers
  const handleRemoveMessage = useCallback((id) => {
    setPendingRemovalMessagesIds((prev) => [...prev, id]);
  }, []);

  const handleAnimationEnd = useCallback((id) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
    setPendingRemovalMessagesIds((prev) => prev.filter((messageId) => messageId !== id));
  }, []);

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
  }, []);

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
