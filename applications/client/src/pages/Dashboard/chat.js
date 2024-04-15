import Sidebar from "../../components/sidebar";
import "../MyProducts/myitems.css";
import Inbox from "../../components/inbox/inbox";

export default function Chat(props) {
  return (
    <>
      <div className="my-items-container">
        <Sidebar></Sidebar>
        <div className="content-container">
          <Inbox></Inbox>
        </div>
      </div>
    </>
  );
}
