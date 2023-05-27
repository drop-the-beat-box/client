import React from "react";
import SideBarButton from "./SideBarButton";
import Following from "./Following";

function SideBar({ currentPage }) {
  let sidebarTopContent = null;
  let sidebarMidContent = null;
  let sidebarBottomContent = null;

  switch (currentPage) {
    case "mainpage":
      sidebarMidContent = <Following />;
      break;
    case "myfilepage":
      sidebarTopContent = <SideBarButton name={"Upload"}></SideBarButton>;
      sidebarMidContent = <div className="sidebar-middleview"></div>;
      sidebarBottomContent = <SideBarButton name={"TrashCan"}></SideBarButton>;
      break;
    case "sharingfilepage":
      sidebarTopContent = <SideBarButton name={"Upload"}></SideBarButton>;
      sidebarMidContent = <div className="sidebar-middleview"></div>;
      sidebarBottomContent = <SideBarButton name={"TrashCan"}></SideBarButton>;
      break;
    case "sharingpage":
      sidebarTopContent = <SideBarButton name={"CreateSharePage"}></SideBarButton>;
      sidebarMidContent = <div className="sidebar-middleview"></div>;
      sidebarBottomContent = <SideBarButton name={"TrashCan"}></SideBarButton>;
      break;
    case "trashfilepage":
      sidebarTopContent = <SideBarButton name={"Back"}></SideBarButton>;
      sidebarMidContent = <div className="sidebar-middleview"></div>;
      sidebarBottomContent = <SideBarButton name={"TrashCan"}></SideBarButton>;
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
