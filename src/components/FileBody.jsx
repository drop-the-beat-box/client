import React, { useState } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faVideo, faFileAlt } from "@fortawesome/free-solid-svg-icons";

import Content from "./Content";
import circle from "../img/circle.png";
import file from "../img/file.png";
import PopupMenu from "../components/PopupMenu";

function FileBody({ files, onAddFile }) {
  const Filter = {
    Image: 0,
    Video: 1,
    Document: 2,
    Favorite: 3,
  };

  const [filter, setFilter] = useState(Filter.Default);
  const [recentButton, setRecentButton] = useState("Default");

  const filterButtons = [
    <FilterButton
      text="Image"
      filterType={0}
    />,
    <FilterButton
      text="Video"
      filterType={1}
    />,
    <FilterButton
      text="Doc"
      filterType={2}
    />,
    <FilterButton
      text="Favorite"
      filterType={3}
    />,
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
        key={sampleList[i].id}
        id={sampleList[i].id}
        name={sampleList[i].name}
        date={sampleList[i].date}
        type={sampleList[i].type}
        imageFile={sampleList[i].imageFile}
        isDeleted={sampleList[i].isDeleted}
      ></Content>
    );
  }

  function GenerateSampleData(dataNum) {
    let sampleData = [];

    for (let index = 0; index < dataNum; index++) {
      sampleData.push({
        id: index,
        name: "Entity " + index,
        date: "생성일 : 2020-05-15",
        type: Filter.Document,
        imageFile: { file },
      });
    }

    return sampleData;
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
      setFilter(props.filterType);
      setRecentButton((prevState) => (prevState = props.text));
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

  // 개별 파일 데이터
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

  return (
    <div className="body">
      <div className="body-top">
        <BodyTopButton
          text="Personal"
          linkPage="/myfilepage"
        ></BodyTopButton>
        <BodyTopButton
          text="Group"
          linkPage="/sharingpage"
        ></BodyTopButton>
      </div>
      <div className="body-second">{filterButtons}</div>
      <div className="body-main">
        <div className="body-container">{rendering}</div>
      </div>
    </div>
  );
}

export default FileBody;
