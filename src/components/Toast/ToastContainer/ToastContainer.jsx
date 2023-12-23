import { useState, useEffect, useCallback } from 'react';
import ToastMessage from '../ToastMessage/ToastMessage';
import { Container } from './styles';
import { toastEventManager } from '../../../utils/toast';

function ToastContainer() {
  const [messages, setMessages] = useState([]);

  // ! handlers
  const handleRemoveMessage = useCallback((id) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
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
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </Container>
  );
}

export default ToastContainer;
