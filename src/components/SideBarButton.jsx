import { useContext, useRef, useState, useEffect } from "react";
import React from "react";
import Profile from "./Profile";
import { setDataChangeHandler, getFollowingMembers } from "../services/DataService";
import { SharedRoomContext } from "./SharedRoomContext";

function SideBarButton({ name }) {
  /*임시*/
  const [persons, setPersons] = useState([]);

  setDataChangeHandler(() => {
    setPersons(getFollowingMembers(0));
  });
  //

  const [isHovering, setIsHovering] = useState(false);
  const onMouseOver = () => setIsHovering(true);
  const onMouseOut = () => setIsHovering(false);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState(null);

  /* 팝업 레이아웃 */
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

  /*방 개설 동작*/
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [roomName, setRoomName] = useState("");

  const handleUserSelect = (user) => {
    // 이미 선택된 사용자인지 확인
    const isUserSelected = selectedUsers.some((selectedUser) => selectedUser.id === user.id);

    if (isUserSelected) {
      // 이미 선택된 사용자라면 선택 해제
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.filter((selectedUser) => selectedUser.id !== user.id)
      );
    } else {
      // 새로운 사용자를 선택
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user]);
    }
  };

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  const { shareroom, setShareroom } = useContext(SharedRoomContext);
  const roomId = useRef(0);

  const handleRoomCreation = () => {
    // 선택한 사용자와 방 이름을 사용하여 방을 개설하는 동작 수행
    // 예를 들어, 서버 요청을 보내거나 필요한 작업을 수행할 수 있음
    console.log("선택한 사용자:", selectedUsers);
    console.log("방 이름:", roomName);

    // 새로운 방 객체 생성
    const newRoom = {
      id: roomId.current,
      name: roomName,
      users: selectedUsers,
    };

    // shareroom 상태 업데이트: 새로운 방을 배열에 추가
    setShareroom((prevShareroom) => [...prevShareroom, newRoom]);

    // 상태 초기화
    setSelectedUsers([]);
    setRoomName("");

    // 방 고유 식별자 증가
    roomId.current += 1;

    //팝업 닫기
    handlePopupClose();
  };
  useEffect(() => {
    console.log("새로운 shareroom:", shareroom);
  }, [shareroom]);

  useEffect(() => {
    console.log("person 추가");
  }, [persons]);

  useEffect(() => {
    if (roomName.length >= 13) {
      alert("방 길이는 13자를 넘을 수 없습니다. 다시 입력해주세요");
      setRoomName("");
    }
  }, [roomName]);
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

            <div className="left-side">
              <div className="left-top">
                <h2 style={{ color: "#486284" }}>개설방의 멤버를 선택해 주십시오</h2>
              </div>
              {/* 사용자 목록 렌더링 */}
              <div className="following-list-container">
                {persons.map((user) => (
                  <div className="following-list">
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={selectedUsers.some((selectedUser) => selectedUser.id === user.id)}
                        onChange={() => handleUserSelect(user)}
                      />
                      <span
                        className={`custom-checkbox ${
                          selectedUsers.some((selectedUser) => selectedUser.id === user.id)
                            ? "checked"
                            : ""
                        }`}
                      ></span>
                    </label>
                    <Profile
                      key={user.id}
                      image={user.image}
                      name={user.name}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="right-side">
              {/* 방 이름 입력 */}
              <input
                className="room-name-input"
                type="text"
                value={roomName}
                onChange={handleRoomNameChange}
                placeholder="개설방의 이름을 설정해주십시오"
                style={{ fontSize: "18px" }}
              />

              {/*누가 추가 되었는가*/}
              <div className="added-list-container">
                {selectedUsers.map((user) => (
                  <div key={user.id}>
                    <Profile
                      key={user.id}
                      image={user.image}
                      name={user.name}
                    />
                  </div>
                ))}
              </div>
              <div>
                <h3>초대 인원: {selectedUsers.length}</h3>
              </div>

              {/* 방 개설 버튼 */}
              <div className="room-creation">
                <button
                  onClick={handleRoomCreation}
                  style={{ position: "absolute", bottom: 0 }}
                >
                  방 만들기
                </button>
              </div>
            </div>
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
