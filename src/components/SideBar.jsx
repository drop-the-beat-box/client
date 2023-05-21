import React, { useState } from "react";
import SideBarButton from "./SideBarButton";

function SideBar() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <SideBarButton
          name={"ButtonName"}
          onClick={handleButtonClick}
        ></SideBarButton>
      </div>

      <div className="sidebar-middle">
        <div className="sidebar-middleview"></div>
      </div>

      <div className="sidebar-bottom">
        <SideBarButton name={"TrashCan"}></SideBarButton>
      </div>

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h1>레이어 팝업</h1>
            <p>팝업 내용...</p>
            <button onClick={handlePopupClose}>닫기</button>
          </div>
        </div>
      )}
    </aside>
  );
}

export default SideBar;
