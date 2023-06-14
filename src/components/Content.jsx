import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faVideo, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import circle from "../img/circle.png";
import PopupMenu from "../components/PopupMenu";
import DeleteConfirm from "./DeleteConfirm";
import { deleteFile } from "../services/APIService";
import { deletePermanent } from "../services/APIService";
import { restoreFile } from "../services/APIService";
import { useCookies } from "react-cookie";

function Content({
  identifier,
  id,
  name,
  date,
  type,
  imageFile,
  isDeleted,
  remainDay,
  link,
  onShare,
}) {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const thumbnailIcons = [faImage, faVideo, faFileAlt];
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [cookies] = useCookies();
  const token = cookies["jwt-token"];

  //임시삭제 (휴지통으로 이동)
  function handleTempDelete() {
    deleteFile(token, id)
      .then((data) => {
        console.log("파일 삭제:", data);
        alert(`${name} ${link}파일이 삭제되었습니다.`);

        //페이지 새로고침
        window.location.reload();
      })
      .catch((error) => {
        console.error("파일 삭제 실패:", error);
        alert("파일 삭제 실패: ", error);
        window.location.reload();
      });
  }

  //영구삭제
  function handleHardDelete() {
    deletePermanent(token, id)
      .then((data) => {
        console.log("파일 영구 삭제 완료:", data, id);
        alert(`${name} 파일이 영구 삭제되었습니다.`);
        //페이지 새로고침
        window.location.reload();
      })
      .catch((error) => {
        console.error("파일 영구 삭제 실패:", error);
        alert("파일 영구 삭제 실패: ", error);
        window.location.reload();
      });
  }
  const closePopupMenu = () => {
    setSelectedItemId(null);
  };
  function download() {
    console.log("download");
    const downloadLink = link;
    const anchor = document.createElement("a");
    anchor.href = downloadLink;
    anchor.download = "file.pdf";
    anchor.click();
    closePopupMenu();
  }

  function restore(item) {
    console.log("복구");
    restoreFile(token, id)
      .then((data) => {
        console.log("파일 복구:", data);
        alert(`${name} 파일이 복구되었습니다.`);
        //페이지 새로고침
        window.location.reload();
      })
      .catch((error) => {
        console.error("파일 복구 실패:", error);
        alert("파일 복구 실패: ", error);
        window.location.reload();
      });
  }

  if (isDeleted) {
    return (
      <button className="content-entity">
        <div className="content-top">
          <img src={circle} className="content-top-button" />
        </div>
        <img src={imageFile} className="content-thumbnail" />
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
                    text: "Share",
                    callback: () => {
                      setSelectedItemId(null);
                      onShare();
                    },
                  },
                  {
                    text: "Delete",
                    callback: () => {
                      setShowDeleteModal(true);
                    },
                  },
                  {
                    text: "Download",
                    callback: () => {
                      download();
                    },
                  },
                ]}
                isOpen={id === selectedItemId}
              />
              {showDeleteModal && (
                <DeleteConfirm
                  name={name}
                  onCancel={() => setShowDeleteModal(false)}
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
          <div className="separator">
            <p>삭제한 지 {remainDay} days </p>
          </div>
        </button>
      );
    }
  }
}

export default Content;
