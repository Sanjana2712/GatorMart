import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import CallEndIcon from '@mui/icons-material/CallEnd';
import Avatar from "@mui/material/Avatar";
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from "../Video/Modal";
import localVideoSrc from "../../images/vid1.jpeg";
import remoteVideoSrc from "../../images/vid2.jpeg";
import VideoCallIcon from '@mui/icons-material/VideoCall';
import "./ChatContainer.css";

const ChatContainer = (props) => {
  const [messages, setMessages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const [isOtherUserDeleted, setIsOtherUserDeleted] = useState(false);

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (inputValue.trim() && !isOtherUserDeleted) {
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

  // Check if other participant exists
  useEffect(() => {
    setIsOtherUserDeleted(!props.otherParticipant || !props.otherParticipant._id);
  }, [props.otherParticipant]);

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


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false); 

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="header-info">
          {props.otherParticipant && props.otherParticipant._id ? (
            <>
              <Avatar
                src={props.otherParticipant.profile_url}
                alt={`${props.otherParticipant.name}'s profile`}
                sx={{ width: 56, height: 56 }}
              />
              <h2 className="chat-room-title">{props.otherParticipant.name}</h2>
            </>
          ) : (
            <>
              <Avatar
                sx={{ width: 56, height: 56 }}
                alt="Deleted User"
              >?</Avatar>
              <h2 className="chat-room-title">Deleted User</h2>
            </>
          )}
        </div>
        <div className="header-actions">
          {!isOtherUserDeleted && (
            <VideoCallIcon className="video-call-icon" onClick={openModal} />
          )}
          <DeleteIcon className="clear-chat-icon" onClick={() => {/* handle clear chat */}} />
        </div>
      </div>
      <div className="messages">
        {messages?.map((msg, i) => {
          // Check if sender exists before trying to access its properties
          const isUserMessage = msg.sender && msg.sender._id === props.user;
          return (
            <div
              key={i}
              className={`chat-bubble ${isUserMessage ? "user" : "friend"}`}
            >
              {msg.content}
              {!msg.sender}
            </div>
          );
        })}
        <div ref={messagesEndRef} />{" "}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isOtherUserDeleted ? "User does not exist" : "Type a message..."}
          className="message-input"
          disabled={isOtherUserDeleted}
        />
        <button 
          onClick={handleSendMessage} 
          className={`send-button ${isOtherUserDeleted ? "disabled" : ""}`}
          disabled={isOtherUserDeleted}
        >
          Send
        </button>
      </div>
      
      {!isOtherUserDeleted && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="video-call-interface">
            <div className="local-video">
              <h4 className="participant-name">You</h4>
              <div className="video-placeholder">
                <img src={localVideoSrc} alt="Your Video Stream" className="video-image" />
              </div>
            </div>
            <div className="remote-video">
              <h4 className="participant-name">{props.otherParticipant?.name}</h4>
              <div className="video-placeholder">
                <img src={remoteVideoSrc} alt={`${props.otherParticipant?.name}'s Video Stream`} className="video-image" />
              </div>
            </div>
          </div>
          <div className="end-call-button-container">
            <button onClick={() => {/* handle end call logic here */}} className="end-call-button">
              <CallEndIcon className="phone-icon" />
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ChatContainer;