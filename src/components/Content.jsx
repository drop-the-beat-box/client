import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faVideo, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import circle from "../img/circle.png";
import PopupMenu from "../components/PopupMenu";
import DeleteConfirm from "./DeleteConfirm";
import { deleteFile } from "../services/APIService";
import { useCookies } from "react-cookie";

function Content({ identifier, id, name, date, type, imageFile, isDeleted }) {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const thumbnailIcons = [faImage, faVideo, faFileAlt];
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [cookies] = useCookies();
  const token = cookies["jwt-token"];

  function moveToTrashcan(item) {
    console.log("trashcan", name, id);
  }

  //임시삭제 (휴지통으로 이동)
  function handleTempDelete() {
    moveToTrashcan("props");
    //
    deleteFile(token, id);
    setShowDeleteModal(false);
    alert(`${name}이 삭제되었습니다.`);
    window.location.reload(); // 페이지 새로고침
  }

  //영구삭제
  function handleHardDelete() {
    console.log("파일이 영구 삭제되었습니다.");
    setShowDeleteModal(false);
    alert(`${name}이 영구 삭제되었습니다.`);
    window.location.reload(); // 페이지 새로고침
  }

  function download(item) {
    console.log("download");
  }

  function restore(item) {
    console.log("복구");
  }

  if (isDeleted) {
    return (
      <button className="content-entity">
        <div className="content-top">
          <img
            src={circle}
            className="content-top-button"
          />
        </div>
        <img
          src={imageFile}
          className="content-thumbnail"
        />
        <div>{name}</div>
        <div>삭제됨</div>
      </button>
    );
  } else {
    if (identifier === "notTrash") {
      return (
        <button className="content-entity">
          <div className="content-top">
            <div className="content-top-button-container">
              <img
                src={circle}
                onClick={() => {
                  if (selectedItemId === id) {
                    setSelectedItemId(null);
                  } else {
                    setSelectedItemId(id);
                  }
                }}
                className="content-top-button"
              />
              <PopupMenu
                items={[
                  {
                    text: "Delete",
                    callback: () => {
                      setShowDeleteModal(true);
                    },
                  },
                  {
                    text: "Download",
                    callback: () => {
                      download("props");
                    },
                  },
                ]}
                isOpen={id === selectedItemId}
              />
              {showDeleteModal && (
                <DeleteConfirm
                  name={name}
                  //취소를 눌렀을 때 동작
                  //모달창을 닫음
                  onCancel={() => setShowDeleteModal(false)}
                  //확인을 눌렀을 때 동작
                  //moveToTrashcan 함수 실행
                  //모달창을 닫음
                  onConfirm={handleTempDelete}
                />
              )}
            </div>
          </div>
          <FontAwesomeIcon
            size={"3x"}
            icon={thumbnailIcons[type]}
            style={{ color: "#6c86b2" }}
          />
          <h1>{name}</h1>
          <p>{date}</p>
        </button>
      );
    } else if (identifier === "Trash") {
      return (
        <button className="content-entity">
          <div className="content-top">
            <div className="content-top-button-container">
              <img
                src={circle}
                onClick={() => {
                  if (selectedItemId === id) {
                    setSelectedItemId(null);
                  } else {
                    setSelectedItemId(id);
                  }
                }}
                className="content-top-button"
              />
              <PopupMenu
                items={[
                  {
                    text: "복구",
                    callback: () => {
                      restore("props");
                    },
                  },
                  {
                    text: "영구 삭제",
                    callback: () => {
                      setShowDeleteModal(true);
                    },
                  },
                ]}
                isOpen={id === selectedItemId}
              />
              {showDeleteModal && (
                <DeleteConfirm
                  name={name}
                  //취소를 눌렀을 때 동작
                  //모달창을 닫음
                  onCancel={() => setShowDeleteModal(false)}
                  //확인을 눌렀을 때 동작
                  //모달창을 닫음
                  onConfirm={handleHardDelete}
                />
              )}
            </div>
          </div>
          <FontAwesomeIcon
            size={"3x"}
            icon={thumbnailIcons[type]}
            style={{ color: "#6c86b2" }}
          />
          <h1>{name}</h1>
          <div class="separator">
            <p>3 days</p>
          </div>
        </button>
      );
    }
  }
}

export default Content;
