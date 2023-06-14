import { useContext, useRef, useState, useEffect, useSyncExternalStore } from "react";
import { useCookies } from "react-cookie";
import React from "react";

import Profile from "./Profile";
import { SharedRoomContext } from "./SharedRoomContext";
import { uploadFile, addFileToRoom, makeRoom, addMember } from "../services/APIService";
import { followingStore, roomStore } from "../services/DataService";

function SideBarButton({ name }) {
  // DataService 스토리지
  const persons = useSyncExternalStore(followingStore.subscribe, followingStore.getSnapshot);

  const [isHovering, setIsHovering] = useState(false);
  const onMouseOver = () => setIsHovering(true);
  const onMouseOut = () => setIsHovering(false);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState(null);
  const [cookies] = useCookies();
  const token = cookies["jwt-token"];

  /* 팝업 레이아웃 */

  const handleButtonClick = (type) => {
    // type = "Trashcan" 일때
    if (type === "TrashCan") {
      window.location.replace("/trashcan");
      return;
    }

    setIsPopupOpen(true);
    setPopupType(type);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setPopupType(null);
  };

  const handleSharingUpload = () => {
    const fileInput = document.getElementById("fileInput");
    const description = "test";

    // console.log(fileInput.files[0]);
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    formData.append("description", description);

    uploadFile(token, formData)
      .then((data) => {
        // 업로드 성공 시에 수행할 작업 처리

        const currentURL = window.location.href;
        const url = new URL(currentURL);
        const pathname = url.pathname;
        const parts = pathname.split("/");
        const team_id = parseInt(parts[parts.length - 1]);

        addFileToRoom(token, data.fileId, team_id)
          .then((dataa) => {
            console.log(dataa);
            console.log(`파일 업로드 성공: ${data.fileId}`);
            alert(`파일 업로드 성공`);
            //페이지 새로고침
            window.location.reload();
            //팝업 닫기
            handlePopupClose();
          })
          .catch((error) => {
            console.log("error : ", error);
          });
      })
      .catch((error) => {
        // 업로드 실패 시에 수행할 작업 처리
        console.error("파일 업로드 실패:", error);
        alert("파일 업로드 실패: ", error);

        handlePopupClose();
      });
  };

  const handleUpload = () => {
    const fileInput = document.getElementById("fileInput");
    const description = "test";

    // console.log(fileInput.files[0]);
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    formData.append("description", description);

    uploadFile(token, formData)
      .then((data) => {
        // 업로드 성공 시에 수행할 작업 처리
        console.log("파일 업로드 성공");
        alert("파일 업로드 성공");

        //페이지 새로고침
        window.location.reload();

        //팝업 닫기
        handlePopupClose();
      })
      .catch((error) => {
        // 업로드 실패 시에 수행할 작업 처리
        console.error("파일 업로드 실패:", error);
        alert("파일 업로드 실패: ", error);

        handlePopupClose();
      });
  };

  /*방 개설 동작*/
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [roomName, setRoomName] = useState("");

  const handleUserSelect = (user) => {
    // 이미 선택된 사용자인지 확인
    const isUserSelected = selectedUsers.some(
      (selectedUser) => selectedUser.friendId === user.friendId
    );

    if (isUserSelected) {
      // 이미 선택된 사용자라면 선택 해제
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.filter((selectedUser) => selectedUser.friendId !== user.friendId)
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

    makeRoom(token, roomName)
      .then((data) => {
        let memberList = [];
        {
          selectedUsers.map((user) => memberList.push(user.friendId));
        }
        addMember(token, data.teamId, memberList)
          .then(() => {
            alert(`${roomName} 방이 개설되었습니다!`);
          })
          .catch((error) => {
            console.log("Fail : ", error);
          });

        // 새로운 방 객체 생성
        const newRoom = {
          id: data.teamId,
          name: roomName,
          users: selectedUsers,
        };

        // shareroom 상태 업데이트: 새로운 방을 배열에 추가
        setShareroom((prevShareroom) => [...prevShareroom, newRoom]);
        handlePopupClose();
        roomStore.updateList(token);
      })
      .catch((error) => {
        // 요청이 실패한 경우 처리할 로직
        console.error("Failed to create team:", error);
        handlePopupClose();
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
      {isPopupOpen && popupType === "SharingUpload" && (
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
              id="fileInput"
              style={{ marginLeft: "10%" }}
            />
            <div className="popup-inner-upload">
              <div className="popup-inner-content-upload"></div>
            </div>
            <button onClick={handleSharingUpload}>파일 업로드</button>
          </div>
        </div>
      )}
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
              id="fileInput"
              style={{ marginLeft: "10%" }}
            />
            <div className="popup-inner-upload">
              <div className="popup-inner-content-upload"></div>
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
                  <div
                    className="following-list"
                    key={user.friendId}
                  >
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={selectedUsers.some(
                          (selectedUser) => selectedUser.friendId === user.friendId
                        )}
                        onChange={() => handleUserSelect(user)}
                      />
                      <span
                        className={`custom-checkbox ${
                          selectedUsers.some(
                            (selectedUser) => selectedUser.friendId === user.friendId
                          )
                            ? "checked"
                            : ""
                        }`}
                      ></span>
                    </label>
                    <Profile member={user} />
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
                    <Profile member={user} />
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
    </>
  );
}

export default React.memo(SideBarButton);
