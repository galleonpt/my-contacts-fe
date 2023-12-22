import { useState, useEffect } from 'react';
import ToastMessage from '../ToastMessage/ToastMessage';
import { Container } from './styles';

function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleAddToast = (event) => {
      const { type, text } = event.detail;

      setMessages((prev) => [
        ...prev,
        { id: Math.random(), text, type },
      ]);
    };

    document.addEventListener('addtoast', handleAddToast);

    return () => {
      document.removeEventListener('addtoast', handleAddToast);
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
