import React, { useState } from "react";
import { useContext } from "react";
import { SharedRoomContext } from "./SharedRoomContext";
import circle from "../img/circle.png";

function BodyTopButton(props) {
  const [isHovering, setIsHovering] = useState(false);
  const [buttonType, setButtonType] = useState("/filepage");

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
            alt="circle"
            className="btbutton-logo-image"
          />
        ) : (
          images.map((image) => (
            <img
              key={image.id}
              src={image.src}
              alt={image.alt}
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

function Circle({ name }) {
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
  const { shareroom } = useContext(SharedRoomContext);

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
        <div className="sharingbody-main-listcontainer">
          <div className="sharingbody-main-list-roomname">
            <Circle
              key={100}
              name={"Dummy Room"}
            />
          </div>

          <div className="sharingbody-main-list-itemcontainer">
            <div className="test">test1</div>
            <div className="test">test2</div>
            <div className="test">test3</div>
            <div className="test">test4</div>
            <div className="test">test5</div>
            <div className="test">test6</div>
            <div className="test">test7</div>
            <div className="test">test8</div>
          </div>
        </div>
        {shareroom.map((room, index) => (
          <div
            className="sharingbody-main-listcontainer"
            key={room.id}
          >
            <div className="sharingbody-main-list-roomname">
              <Circle
                key={index}
                name={room.name}
              />
            </div>

            <div className="sharingbody-main-list-itemcontainer">
              {room.users.map((user) => (
                <div
                  className="test"
                  key={user.id}
                >
                  {user.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SharingBody;
