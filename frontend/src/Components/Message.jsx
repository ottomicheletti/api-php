/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { messageStore } from '../Store/Message';
import { XSquare, CheckSquare } from '@phosphor-icons/react';
import './Message.css';

function Message() {
  const { message, clearMessage } = messageStore((state) => state);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    if (!message.text) {
      setVisivel(false);
      return;
    }

    setVisivel(true);

    const timer = setTimeout(() => {
      setVisivel(false);
      clearMessage();
    }, 2000);

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <>
      {visivel && (
        <div className={`message-default ${message.type}`}>
          {message.type === 'success' && <CheckSquare size={32} className='check' />}
          {message.type === 'error' && <XSquare size={32} className='x' />}
          <p>{message.text}</p>
        </div>
      )}
    </>
  );
}

export default Message;
