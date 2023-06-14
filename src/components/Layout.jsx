import { useCookies } from "react-cookie";

import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";
import Body from "./Body";
import { SharedRoomProvider } from "./SharedRoomContext";
import { followingStore, roomStore } from "../services/DataService";

function Layout({ currentPage }) {
  const [cookie] = useCookies();
  const token = cookie["jwt-token"];
  followingStore.updateList(token);
  roomStore.updateList(token);

  return (
    <div className="layout">
      <div className="top">
        <Header />
      </div>

      <div className="middle">
        <SharedRoomProvider>
          <SideBar currentPage={currentPage} />
          <Body currentPage={currentPage} />
        </SharedRoomProvider>
      </div>

      <div className="bottom">
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
