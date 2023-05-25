import React, { useState } from "react";
import SideBarButton from "./SideBarButton";
import Following from "./Following";

function SideBar({ currentPage }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState(null);

  const handleButtonClick = (type) => {
    setIsPopupOpen(true);
    setPopupType(type);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setPopupType(null);
  };
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  const handleUpload = () => {
    // 파일 업로드를 수행하는 로직 구현
    // 예를 들어, 선택된 파일들을 FormData로 랩핑하여 서버에 전송하는 코드를 작성할 수 있음
    const formData = new FormData();
    selectedFiles.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    // AJAX 또는 fetch를 사용하여 서버에 파일을 전송
    // 예시로 fetch를 사용한 코드를 작성
    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // 업로드 성공 시에 수행할 작업 처리
        console.log("파일 업로드 성공:", data);
      })
      .catch((error) => {
        // 업로드 실패 시에 수행할 작업 처리
        console.error("파일 업로드 실패:", error);
      });
  };
  let sidebarTopContent = null;
  let sidebarMidContent = null;
  let sidebarBottomContent = null;
  if (currentPage === "mainpage") {
    sidebarMidContent = <Following></Following>;
  } else if (currentPage === "myfilepage") {
    sidebarTopContent = (
      <SideBarButton
        name={"Upload"}
        onClick={() => handleButtonClick("upload")}
      ></SideBarButton>
    );
    sidebarMidContent = <div className="sidebar-middleview"></div>;
    sidebarBottomContent = <SideBarButton name={"TrashCan"}></SideBarButton>;
  } else if (currentPage === "sharingfilepage") {
    sidebarTopContent = <SideBarButton name={"Upload"}></SideBarButton>;
    sidebarMidContent = <div className="sidebar-middleview"></div>;
    sidebarBottomContent = <SideBarButton name={"TrashCan"}></SideBarButton>;
  } else if (currentPage === "sharingpage") {
    sidebarTopContent = (
      <SideBarButton
        name={"CreateSharePage"}
        onClick={() => handleButtonClick("createsharepage")}
      ></SideBarButton>
    );
    sidebarMidContent = <div className="sidebar-middleview"></div>;
    sidebarBottomContent = <SideBarButton name={"TrashCan"}></SideBarButton>;
  } else if (currentPage === "trashfilepage") {
    sidebarTopContent = (
      <SideBarButton
        name={"Back"}
        onClick={() => handleButtonClick("back")}
      ></SideBarButton>
    );
    sidebarMidContent = <div className="sidebar-middleview"></div>;
    sidebarBottomContent = <SideBarButton name={"TrashCan"}></SideBarButton>;
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-top">{sidebarTopContent}</div>
      <div className="sidebar-middle">{sidebarMidContent}</div>
      <div className="sidebar-bottom">{sidebarBottomContent}</div>

      {isPopupOpen && popupType === "upload" && (
        <div className="popup-overlay-upload">
          <div className="popup-content-upload">
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              style={{ marginLeft: "10%" }}
            />
            <div className="popup-inner-upload">
              <div className="popup-inner-content-upload">
                <div>
                  {selectedFiles.map((file, index) => (
                    <p key={index}>{file.name}</p>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={handleUpload}>파일 업로드</button>
            <button onClick={handlePopupClose}>Close</button>
          </div>
        </div>
      )}
      {isPopupOpen && popupType === "createsharepage" && (
        // CreateSharePage 버튼 클릭 시에 팝업 레이아웃 내용
        <div className="popup-overlay-createshare">
          <div className="popup-content-createshare"></div>
        </div>
      )}

      {isPopupOpen && popupType === "back" && (
        // Back 버튼 클릭 시에 팝업 레이아웃 내용
        <div />
      )}
    </aside>
  );
}

export default SideBar;
