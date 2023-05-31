import React, { useState } from "react";
import Modal from "react-modal";

import circle from "../img/circle.png";
import image from "../img/image.png";
import video from "../img/video.png";
import document from "../img/document.png";
import file from "../img/file.png";
import PopupMenu from "../components/PopupMenu";

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
        {props.linkPage == "/myfilepage" ? (
          <img src={circle} alt="circle" className="btbutton-logo-image" />
        ) : (
          images.map((image) => (
            <img key={image.id} src={image.src} alt={image.alt} />
          ))
        )}
      </div>
      <div className="btbutton-text">
        <p>{props.text}</p>
      </div>
    </button>
  );
}

function Popup(props) {
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={() => props.setIsPopupOpen(false)}
      style={{
        content: {
          width: "400px",
          height: "300px",
          top: props.x,
          left: props.y,
        },
      }}
    >
      Hello
    </Modal>
  );
}

// 개별 파일 데이터
function Content(props) {
  let id = props.id;
  let name = props.name;
  let date = props.date;
  let type = props.type;
  let thumbnail = props.imageFile;
  let isDeleted = false;

  if (isDeleted) {
    return (
      <button className="content-entity">
        <div className="content-top">
          <img src={circle} className="content-top-button" />
        </div>
        <img src={thumbnail} className="content-thumbnail" />
        <div>{name}</div>
        <div>삭제됨</div>
      </button>
    );
  } else {
    return (
      <button className="content-entity">
        <div className="content-top">
          <img
            src={circle}
            onClick={(event) => {
              props.setIsPopupOpen(true);
            }}
            className="content-top-button"
          />
        </div>
        <Popup />
        <img src={thumbnail} className="content-thumbnail" />
        <div>{name}</div>
        <div>{date}</div>
      </button>
    );
  }
}

// 필터 버튼 4 개
function FilterButton(props) {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [stateName, setStateName] = useState("filterbutton");

  if (props.recentButton == props.text) {
    if (stateName != "filterbutton-clicked") {
      setStateName((prevState) => (prevState = "filterbutton-clicked"));
      console.log(props.text, " Rendered");
    }
  }

  const onMouseOver = () => {
    if (isClicked) {
      return;
    }
    setStateName("filterbutton-hover");
  };
  const onMouseOut = () => {
    if (isClicked) {
      return;
    }
    setStateName("filterbutton");
  };
  const onMouseClick = () => {
    setIsClicked((prevState) => !prevState);
    props.setFilter(props.filterType);
    props.setRecentButton((prevState) => (prevState = props.text));
  };

  return (
    <button
      className={stateName}
      onClick={onMouseClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <div className="filterbutton-text">
        <p>{props.text}</p>
      </div>
    </button>
  );
}

function FileBody() {
  const Filter = {
    Default: 0,
    Image: 1,
    Video: 2,
    Document: 3,
    Etc: 4,
  };

  const [filter, setFilter] = useState(Filter.Default);
  const [recentButton, setRecentButton] = useState("Default");

  const filterButtons = [
    <FilterButton text="Image" filterType={1} />,
    <FilterButton text="Video" filterType={2} />,
    <FilterButton text="Doc" filterType={3} />,
    <FilterButton text="ETC" filterType={0} />,
  ];

  let dataNum = 20;
  let sampleList = GenerateSampleData(dataNum);
  let rendering = [];

  // 컨텐츠 렌더링 그려주기
  for (let i = 0; i < sampleList.length; i++) {
    if (sampleList[i].type != filter || sampleList[i].isDeleted) {
      continue;
    }
    rendering.push(
      <Content
        id={sampleList[i].id}
        name={sampleList[i].name}
        date={sampleList[i].date}
        type={sampleList[i].type}
      ></Content>
    );
  }

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  function GenerateSampleData(dataNum) {
    let sampleData = [];

    for (let index = 0; index < dataNum; index++) {
      sampleData.push({
        id: index,
        name: "Entity " + index,
        date: "생성일 : 2020-05-15",
        type: Filter.Default,
        imageFile: { file },
      });
    }

    return sampleData;
  }

  return (
    <div className="body">
      <div className="body-top">
        <BodyTopButton text="Personal" linkPage="/myfilepage"></BodyTopButton>
        <BodyTopButton text="Group" linkPage="/sharingpage"></BodyTopButton>
      </div>
      <div className="body-second">{filterButtons}</div>
      <div className="body-main">
        <Popup />
        <div className="body-container">{rendering}</div>
      </div>
    </div>
  );
}

export default FileBody;
