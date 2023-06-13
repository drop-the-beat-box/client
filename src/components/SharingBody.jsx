import React, { useEffect, useState } from "react";
import { useContext } from "react";
import circle from "../img/circle.png";
import { getMyRooms } from "../services/APIService";
import { getSharedFile } from "../services/APIService";
import { useCookies } from "react-cookie";
import Content from "./Content";

function BodyTopButton(props) {
  const [isHovering, setIsHovering] = useState(false);

  const onMouseOver = () => setIsHovering(true);
  const onMouseOut = () => setIsHovering(false);

  const images = Array.from({ length: 3 }, (_, index) => ({
    id: index,
    src: circle,
    alt: `Image ${index}`,
  }));

  return (
    <button
      onClick={(event) => {
        event.preventDefault();
        window.location.replace(props.linkPage);
      }}
      className={isHovering ? "btbutton-hover" : "btbutton"}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <div className="btbutton-logo">
        {props.linkPage === "/myfilepage" ? (
          <img
            src={circle}
            alt="profile"
            className="btbutton-logo-image"
          />
        ) : (
          images.map((image) => (
            <img
              key={image.id}
              src={image.src}
              alt={image.alt}
              className="btbutton-logo-image"
            />
          ))
        )}
      </div>
      <div className="btbutton-text">
        <p>{props.text}</p>
      </div>
    </button>
  );
}

function Circle({ name, id }) {
  const [gradientColor] = useState(getRandomColor());

  // 랜덤 색상을 생성하는 함수
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <div className="circlecontainer">
      <div
        className="circle"
        style={{ background: gradientColor }}
      />
      <h2>{name}</h2>
    </div>
  );
}
function SharingBody() {
  const [cookies] = useCookies();
  const [rooms, setRooms] = useState([]);
  const [fileList, setFileList] = useState([]);
  const token = cookies["jwt-token"];

  function getType(url) {
    const [last] = url.split(".").slice(-1);
    switch (last) {
      case "png":
      case "jpg":
      case "jpeg":
        return 0;
      case "mov":
      case "avi":
      case "mp4":
        return 1;
      default:
        return 2;
    }
  }

  useEffect(() => {
    getMyRooms(token)
      .then((result) => {
        setRooms(
          result.map((team, index) => {
            return (
              <Circle
                name={team.teamName}
                id={team.teamId}
              ></Circle>
            );
          })
        );
      })
      .catch((error) => {});
  }, [rooms]);

  useEffect(() => {
    rooms.forEach((room) => {
      const { id } = room.props;
      getSharedFile(token, id)
        .then((files) => {
          setFileList((prevFileList) => ({
            ...prevFileList,
            [id]: files,
          }));
        })
        .catch((error) => {
          // 에러 처리
        });
    });
  }, [rooms, token]);

  return (
    <div className="sharingbody">
      <div className="sharingbody-top">
        <BodyTopButton
          text="Personal"
          linkPage="/myfilepage"
        ></BodyTopButton>
        <BodyTopButton
          text="Group"
          linkPage="/sharingpage"
        ></BodyTopButton>
      </div>

      <div className="sharingbody-main">
        <div>
          {rooms.map((room, index) => (
            <div className="sharingbody-main-listcontainer">
              <div
                key={index}
                className="sharingbody-main-list-roomname"
              >
                {room}
              </div>
              <div className="sharingbody-main-list-itemcontainer">
                {fileList[room.props.id] &&
                  fileList[room.props.id].map((file) => (
                    <div
                      className="sharingbody-main-filelist"
                      key={file.id}
                    >
                      <Content
                        identifier="share"
                        name={file.name}
                        id={file.fileId}
                        date={file.createdAt}
                        link={file.url}
                        type={getType(file.url)}
                      ></Content>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SharingBody;
