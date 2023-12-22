import { useState, useEffect } from 'react';
import ToastMessage from '../ToastMessage/ToastMessage';
import { Container } from './styles';
import { toastEventManager } from '../../../utils/toast';

function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleAddToast = ({ type, text }) => {
      setMessages((prev) => [
        ...prev,
        { id: Math.random(), text, type },
      ]);
    };

    toastEventManager.on('addtoast', handleAddToast);

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, []);

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          type={message.type}
          text={message.text}
        />
      ))}
    </Container>
  );
}

export default ToastContainer;
