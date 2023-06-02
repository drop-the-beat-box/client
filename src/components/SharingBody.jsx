import React, { useState } from "react";

import circle from "../img/circle.png";
import RoomList from "./RoomList";

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
function SharingBody() {
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
        <RoomList />
      </div>
    </div>
  );
}

export default SharingBody;
