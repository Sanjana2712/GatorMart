import React, { useState } from 'react';
import './ChatContainer.css'; // Make sure to style this file

const ChatContainer = () => {
  const [messages, setMessages] = useState([
    { id: 1, message: "Hello! How are you?", sender: "friend" },
    { id: 2, message: "I'm good, thanks! How about you?", sender: "user" },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages(prevMessages => [
        ...prevMessages,
        { id: Date.now(), message: inputValue, sender: 'user' },
      ]);
      setInputValue(''); // Clear input field after sending
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map(msg => (
          <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
            {msg.message}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."
          className="message-input"
        />
        <button onClick={handleSendMessage} className="send-button">Send</button>
      </div>
    </div>
  );
};

export default ChatContainer;
