import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import ReactLoading from "react-loading";

import Content from "./Content";
import AddToGroup from "./AddToGroup";
import ProfileImage from "../img/circle.png";
import { getMyFiles, addFileToRoom } from "../services/APIService";
import MainLogo from "../img/mainlogo.png";

function FileBody() {
  const Filter = {
    Image: 0,
    Video: 1,
    Document: 2,
    Etc: 3,
    Home: 4,
  };

  const [filter, setFilter] = useState(Filter.Home);
  const [recentButton, setRecentButton] = useState("Default");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sharingFile, setSharingFile] = useState(null);
  const [cookies] = useCookies();
  const token = cookies["jwt-token"];

  const filterButtons = [
    <FilterButton key={0} text="Image" filterType={0} />,
    <FilterButton key={1} text="Video" filterType={1} />,
    <FilterButton key={2} text="Doc" filterType={2} />,
    <FilterButton key={3} text="Etc" filterType={3} />,
  ];

  useEffect(() => {
    setIsLoading(true);
    getMyFiles(token).then((result) => {
      setItems(
        result
          .filter((item) => getType(item.url) === filter)
          .map((item) => (
            <Content
              key={item.fileId}
              identifier="notTrash"
              id={item.fileId}
              name={item.name}
              date={item.createdAt}
              type={getType(item.url)}
              link={item.url}
              imageFile={null}
              isDeleted={false}
              onShare={() => {
                setSharingFile(item);
                setIsModalOpen(true);
              }}
            ></Content>
          ))
      );
      setIsLoading(false);
    });
  }, [filter]);

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

  // 필터 버튼 4 개
  function FilterButton(props) {
    const [isClicked, setIsClicked] = useState(false);
    const [stateName, setStateName] = useState("filterbutton");

    if (props.recentButton === props.text) {
      if (stateName !== "filterbutton-clicked") {
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

    const onMouseOver = () => setIsHovering(true);
    const onMouseOut = () => setIsHovering(false);

    const images = Array.from({ length: 3 }, (_, index) => ({
      id: index,
      src: ProfileImage,
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
              src={ProfileImage}
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

  return (
    <div className="body">
      {isModalOpen && sharingFile !== null ? (
        <AddToGroup
          onCancel={() => {
            setIsModalOpen(false);
          }}
          onSelect={(room_id) => {
            console.log(room_id, sharingFile.fileId);
            addFileToRoom(token, sharingFile.fileId, room_id).then((result) => {
              alert(`파일이 추가되었습니다.`);
              console.log(result);
              setIsModalOpen(false);
              setSharingFile(null);
            });
          }}
        ></AddToGroup>
      ) : null}
      <div className="body-top">
        <BodyTopButton text="Personal" linkPage="/myfilepage"></BodyTopButton>
        <BodyTopButton text="Group" linkPage="/sharingpage"></BodyTopButton>
      </div>
      <div className="body-second">{filterButtons}</div>
      <div className="body-main">
        {isLoading ? (
          <ReactLoading type="bars" color="#415165"></ReactLoading>
        ) : (
          <>
            {filter === Filter.Home ? (
              <div className="body-home">
                <img src={MainLogo} alt="main logo image" />
                <h1>Welcome!</h1>
                <p>Press 'Upload' button to upload your first file.</p>
                <p></p>
              </div>
            ) : (
              <div className="body-container">{items}</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default FileBody;
