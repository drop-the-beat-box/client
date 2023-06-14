import React, { useState, useSyncExternalStore } from "react";
import ReactLoading from "react-loading";
import { roomStore } from "../services/DataService";
import circle from "../img/circle.png";
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
  const shareroom = useSyncExternalStore(roomStore.subscribe, roomStore.getSnapshot);

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

      {roomStore.getIsRoomLoaded() ? (
        <div className="sharingbody-main">
          {shareroom.map((room, index) => (
            <div
              className="sharingbody-main-listcontainer"
              key={room.teamId}
              onClick={() => {
                window.location.replace(`/sharingfilepage/${room.teamId}`);
              }}
            >
              <div className="sharingbody-main-list-roomname">
                <Circle
                  key={index}
                  name={room.teamName}
                  id={room.teamId}
                />
              </div>

              <div className="sharingbody-main-list-itemcontainer">
                {room.files.map((file) => (
                  <div
                    className="test"
                    key={file.fileId}
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
      ) : (
        <div className="sharingbody-loading-container">
          <ReactLoading
            type="bars"
            color="#415165"
          ></ReactLoading>
        </div>
      )}
    </div>
  );
}

export default SharingBody;
