import React from 'react';
import './ChatBubble.css'; // Make sure to create this CSS file

const ChatBubble = ({ message, sender }) => {
  return (
    <div className={`chat-bubble ${sender}`}>
      {message}
    </div>
  );
};

export default ChatBubble;
