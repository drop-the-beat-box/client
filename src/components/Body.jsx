import { useState } from "react";
import {Link, useParams} from "react-router-dom";
import circle from "../img/circle.png";
import image from "../img/image.png";
import video from "../img/video.png";
import document from "../img/document.png";
import file from "../img/file.png";

function Content(props) {

  let id = props.id;
  let name = props.name
  let date = props.date;
  let type = props.type;
  let thumbnail = props.imageFile;
  let isDeleted = false;

  if(isDeleted)
  {
    return (
      <button className="content-entity">
      <div className="content-top">
        <img src = {circle} className="content-top-button"/>
      </div>
      <img src={thumbnail} className="content-thumbnail"/>
      <div>{name}</div>
      <div>삭제됨</div>
      </button>
    )
  }
  else{
    return (
      <button className="content-entity">
        <div className="content-top">
          <img src = {circle} className="content-top-button"/>
        </div>
        <img src={thumbnail} className="content-thumbnail"/>
        <div>{name}</div>
        <div>{date}</div>
      </button>
    );
  }
}



function BodyTopButton(props) {
    const [isHovering, setIsHovering] = useState(false);
  
    const onMouseOver = () => setIsHovering(true);
    const onMouseOut=() => setIsHovering(false);

    return (
        <button onClick = {(event) => {
            event.preventDefault();
            window.location.replace(props.linkPage);
        }} 
        className={isHovering? "btbutton-hover" : "btbutton"}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        >
            <div className= "btbutton-logo">
                <img src={circle} alt= "circle" className="btbutton-logo-image"/>
            </div>
            <div className="btbutton-text">
                <p>{props.text}</p>
            </div>
        </button>
    )
}

function Body() {

  const Filter = {
    Default: 0,
    Image: 1,
    Video: 2,
    Document: 3,
    Etc: 4
  }

  const [filter, setFilter] = useState(Filter.Default);

  const filterButtons = [
    <FilterButton text = "Image" filterType = {1}/>,
    <FilterButton text = "Video" filterType = {2}/>,
    <FilterButton text = "Doc" filterType = {3}/>,
    <FilterButton text = "ETC" filterType = {0}/>,
  ]

  let dataNum = 20;
  let sampleList = GenerateSampleData(dataNum);
  let rendering = [];

  // 컨텐츠 렌더링 그려주기
  for (let i = 0; i < sampleList.length; i++) {
    if(sampleList[i].type != filter || sampleList[i].isDeleted)
    {
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

  function FilterButton(props) {
    const [isHovering, setIsHovering] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
  
      const onMouseOver = () => setIsHovering(true);
      const onMouseOut=() => setIsHovering(false);
  
      return (
          <button onClick = {(event) => {
              event.preventDefault();
              setFilter(props.filterType);
          }} 
          className={isHovering? "filterbutton-hover" : "filterbutton"}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
          >
              <div className="filterbutton-text">
                  <p>{props.text}</p>
              </div>
          </button>
      )
  }

  function GenerateSampleData(dataNum) {
    let sampleData = [];
  
    for (let index = 0; index < dataNum; index++) {
      sampleData.push({ id: index, name: ("Entity " + index), date: "생성일 : 2020-05-15", type: Filter.Default, imageFile: {file}});
    }
  
    return sampleData;
  }

  return (
    <div className="body">
      <div className="body-top">
        <BodyTopButton 
        text="Personal"
        linkPage ="/myfilepage">
        </BodyTopButton>

        <BodyTopButton 
        text="Group"
        linkPage ="/sharingpage">
        </BodyTopButton>
      </div>
      <div className="body-second">
        {filterButtons}
      </div>
      <div className="body-main">
        <div className="body-container">{rendering}</div>
      </div>
    </div>
  );
}



export default Body;
