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

  // Create safer rendering logic with more checks
  const allInboxChats = props.allChatRooms?.map((chatRoom, i) => {
    if (!chatRoom || !chatRoom._id) {
      return null;
    }
    
    if (!chatRoom.participants || !Array.isArray(chatRoom.participants) || chatRoom.participants.length < 2) {
      console.log(`ChatRoom ${chatRoom._id} has invalid participants:`, chatRoom.participants);
      return (
        <div key={i}>
          <div
            className={`chat ${chatRoom._id === props.activeRoom ? "activeRoom" : ""}`}
            onClick={() => handleInboxClick(chatRoom)}
          >
            <Avatar sx={{ width: 56, height: 56 }}>?</Avatar>
            <h5>Deleted User</h5>
          </div>
          <hr></hr>
        </div>
      );
    }
    
    const participant0 = chatRoom.participants[0];
    const participant1 = chatRoom.participants[1];
    
    console.log("Participant 0:", participant0);
    console.log("Participant 1:", participant1);
    
    // Find which participant to display (not the current user)
    let displayParticipant;
    
    // Super defensive checking of both participants
    if (participant0 && participant0._id && props.user && props.user === participant0._id) {
      // Current user is participant0, so display participant1
      displayParticipant = participant1;
    } else {
      // Otherwise display participant0
      displayParticipant = participant0;
    }
    
    console.log("Display participant:", displayParticipant);
    
    // Final safety check for the display participant
    if (!displayParticipant || !displayParticipant._id) {
      return (
        <div key={i}>
          <div
            className={`chat ${chatRoom._id === props.activeRoom ? "activeRoom" : ""}`}
            onClick={() => handleInboxClick(chatRoom)}
          >
            <Avatar sx={{ width: 56, height: 56 }}>!</Avatar>
            <h5>Deleted User</h5>
          </div>
          <hr></hr>
        </div>
      );
    }
    
    // Safe rendering with fallbacks for all properties
    return (
      <div key={i}>
        <div
          className={`chat ${chatRoom._id === props.activeRoom ? "activeRoom" : ""}`}
          onClick={() => handleInboxClick(chatRoom)}
        >
          <Avatar
            src={displayParticipant.profile_url || ""}
            sx={{ width: 56, height: 56 }}
            alt={displayParticipant.name || "User"}
          ></Avatar>
          <h5>{displayParticipant.name || "Unknown User"}</h5>
        </div>
        <hr></hr>
      </div>
    );
  }).filter(Boolean); // Remove null entries
  
  return (
    <>
      <div className="inboxcontainer">
        {allInboxChats && allInboxChats.length > 0 ? allInboxChats : <p>No messages available</p>}
      </div>
    </>
  );
}