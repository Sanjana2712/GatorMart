import Sidebar from "../../components/sidebar";
import "../MyProducts/myitems.css";
import Inbox from "../../components/inbox/inbox";
import ChatContainer from "../../components/ChatContainer/ChatContainer";
import './chat.css'

export default function Chat(props) {
  return (
    <div className="my-items-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content-container">
        <div className="inbox">
          <Inbox />
        </div>
        <div className="chat-container">
          <ChatContainer />
        </div>
      </div>
    </div>
  );
}
