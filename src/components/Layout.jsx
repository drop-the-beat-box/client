import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";
import Body from "./Body";

function Layout({ currentPage }) {
  return (
    <div className="layout">
      <div className="top">
        <Header />
      </div>

      <div className="middle">
        <SideBar currentPage={currentPage} />
        <Body currentPage={currentPage} />
      </div>

      <div className="bottom">
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
