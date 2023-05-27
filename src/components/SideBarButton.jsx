import { useState } from "react";
import React from "react";

function SideBarButton({ name }) {
  const [isHovering, setIsHovering] = useState(false);
  const onMouseOver = () => setIsHovering(true);
  const onMouseOut = () => setIsHovering(false);

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

  return (
    <>
      <button
        onClick={() => handleButtonClick(name)}
        className={isHovering ? "sbbutton-hover" : "sbbutton"}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      >
        <div className="sbbutton-text">
          <p>{name}</p>
        </div>
      </button>

      {isPopupOpen && popupType === "Upload" && (
        <div className="popup-overlay-upload">
          <div className="popup-content-upload">
            <button
              onClick={handlePopupClose}
              className="close-button"
            >
              X
            </button>
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
          </div>
        </div>
      )}
      {isPopupOpen && popupType === "CreateSharePage" && (
        // CreateSharePage 버튼 클릭 시에 팝업 레이아웃 내용
        <div className="popup-overlay-createshare">
          <div className="popup-content-createshare">
            <button
              onClick={handlePopupClose}
              className="close-button"
            >
              X
            </button>
          </div>
        </div>
      )}

      {isPopupOpen && popupType === "back" && (
        // Back 버튼 클릭 시에 팝업 레이아웃 내용
        <div />
      )}
    </>
  );
}

export default React.memo(SideBarButton);
