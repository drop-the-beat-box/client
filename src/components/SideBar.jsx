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
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              style={{ marginLeft: "10%" }}
            />
            <div className="popup-inner">
              <div className="popup-inner-content">
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
    </aside>
  );
}

export default SideBar;
