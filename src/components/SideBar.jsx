import React from "react";
import SideBarButton from "./SideBarButton";
import Following from "./Following";

function SideBar({ currentPage }) {
  let sidebarTopContent = null;
  let sidebarMidContent = null;
  let sidebarBottomContent = null;

  switch (currentPage) {
    case "mainpage":
      sidebarTopContent = <h2 style={{ color: "#7B95B7" }}>Following List</h2>;
      sidebarMidContent = <Following name={"MainPage"} />;
      break;
    case "myfilepage":
      sidebarTopContent = <SideBarButton name={"Upload"}></SideBarButton>;
      sidebarMidContent = <Following name={"MainPage"} />;
      sidebarBottomContent = <SideBarButton name={"TrashCan"}></SideBarButton>;
      break;
    case "sharingfilepage":
      sidebarTopContent = <SideBarButton name={"Upload"}></SideBarButton>;
      sidebarMidContent = <Following name={"SharingFilePage"} />;
      sidebarBottomContent = <SideBarButton name={"TrashCan"}></SideBarButton>;
      break;
    case "sharingpage":
      sidebarTopContent = (
        <SideBarButton name={"CreateSharePage"}></SideBarButton>
      );
      sidebarMidContent = <Following name={"MainPage"} />;
      sidebarBottomContent = <SideBarButton name={"TrashCan"}></SideBarButton>;
      break;
    case "trashcan":
      return null;
    default:
      break;
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-top">{sidebarTopContent}</div>
      <div className="sidebar-middle">{sidebarMidContent}</div>
      <div className="sidebar-bottom">{sidebarBottomContent}</div>
    </aside>
  );
}
export default SideBar;
