import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ChatContainer.css";

const ChatContainer = (props) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (inputValue.trim()) {
      props.socket.emit("sendMessage", {
        roomId: props.activeRoom,
        content: inputValue.trim(),
        sender: props.user,
      });
      setInputValue("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage(event);
    }
  };
  const scrollDown = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  };

  useEffect(() => {
    const getAllMessages = async () => {
      if (props.activeRoom !== null && props.activeRoom !== "default") {
        const response = await axios.post(
          "http://localhost:4000/api/getAllChatRoomMessages",
          {
            chatRoomId: props.activeRoom,
          }
        );
        setMessages(response.data.data || []);
        scrollDown();
      } else {
        setMessages([]);
      }
    };
    getAllMessages();
  }, [props.activeRoom]);

  useEffect(() => {
    if (props.socket) {
      props.socket.on("receiveMessage", (message) => {
        setMessages((prevMessages) => [...prevMessages, message.message]);
      });
    }
  }, [props.socket]);

  useEffect(() => {
    scrollDown();
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="messages">
        {messages?.map((msg, i) => (
          <div
            key={i}
            className={`chat-bubble ${
              msg.sender._id === props.user ? "user" : "friend"
            }`}
          >
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />{" "}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="message-input"
        />
        <button onClick={handleSendMessage} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatContainer;
