import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/sidebar";
import "../MyProducts/myitems.css";
import Inbox from "../../components/inbox/inbox";
import ChatContainer from "../../components/ChatContainer/ChatContainer";
import "./chat.css";
import io from "socket.io-client";

export default function Chat(props) {
  const { chatRoom } = useParams();
  const [activeRoom, setActiveRoom] = useState(null);
  const [allChatRooms, setAllChatRooms] = useState(null);
  const [socket, setSocket] = useState(null);
  const user = props.user;

  useEffect(() => {
    const getAllUserChatRooms = async () => {
      try {
        if (user !== null) {
          const response = await axios.post(
            "http://localhost:4000/api/getAllUserChatRooms",
            { userId: user }
          );

          setAllChatRooms(response.data.data);
        }
      } catch (error) {
        console.log("Could not fetch all chatRooms");
      }
    };
    getAllUserChatRooms();
    const newSocket = io("http://localhost:4000", {
      transports: ["websocket"],
    });
    setSocket(newSocket);
    return () => newSocket.close();
  }, [user]);

  useEffect(() => {
    if (chatRoom === "default" && allChatRooms?.length > 0) {
      setActiveRoom(allChatRooms[0]._id);
      if (socket) socket.emit("joinRoom", allChatRooms[0]._id);
    } else if (chatRoom !== "default") {
      setActiveRoom(chatRoom);
      if (socket) socket.emit("joinRoom", chatRoom);
    }
  }, [chatRoom, allChatRooms]);

  return (
    <div className="my-items-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content-container">
        <div className="inbox">
          <Inbox
            socket={socket}
            activeRoom={activeRoom}
            setActiveRoom={setActiveRoom}
            allChatRooms={allChatRooms}
            user={user}
          />
        </div>
        <div className="chat-container">
          <ChatContainer socket={socket} activeRoom={activeRoom} user={user} />
        </div>
      </div>
    </div>
  );
}
