import { useState } from 'react';
import ToastMessage from '../ToastMessage/ToastMessage';
import { Container } from './styles';

function ToastContainer() {
  const [messages] = useState([
    { id: Math.random(), type: 'default', text: 'Default message' },
    { id: Math.random(), type: 'danger', text: 'Danger message' },
    { id: Math.random(), type: 'success', text: 'Success message' },
  ]);

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
