import React from 'react';
import { selectMessages } from "../../store/messageSlice";
import { Alert } from 'react-bootstrap';
import { useSelector } from "react-redux";

const Messages = () => {
  const messages = useSelector(selectMessages);

  if (!messages.length) {
    return null;
  }

  return (
    <div style={{ position: 'fixed', bottom: 10, right: 10 }}>
      {
        messages.map(message => (
          <Alert key={message.id} variant={message.variant}>
            { message.text }
          </Alert>
        ))
      }
    </div>
  );
}

export default Messages;
