import "./inbox.css";
import Avatar from "@mui/material/Avatar";
import { useState, useEffect } from "react";

export default function Inbox(props) {
  const handleInboxClick = (chatRoom) => {
    if (chatRoom._id !== props.activeRoom) {
      props.socket.emit("leaveRoom", props.activeRoom);
      props.setActiveRoom(chatRoom._id);
      props.socket.emit("joinRoom", chatRoom._id);
    }
  };
  const allInboxChats = props.allChatRooms?.map((chatRoom, i) => {
    let index = 0;
    if (props.user !== chatRoom.participants[1]._id) {
      index = 1;
    }
    return (
      <div key={i}>
        <div
          className={`chat ${
            chatRoom._id === props.activeRoom ? "activeRoom" : ""
          }`}
          onClick={() => handleInboxClick(chatRoom)}
        >
          <Avatar
            src={chatRoom.participants[index].profile_url}
            sx={{ width: 56, height: 56 }}
            alt={chatRoom.participants[index].name}
          ></Avatar>
          <h5>{chatRoom.participants[index].name}</h5>
        </div>
        <hr></hr>
      </div>
    );
  });

  return (
    <>
      <div className="inboxcontainer">{allInboxChats}</div>
    </>
  );
}
