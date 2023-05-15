import { useState } from "react";
import circle from "../img/circle.png";

function Content(props) {
  return (
    <div className="content-entity">
      <div>{props.id}</div>
      <div>{props.name}</div>
      <div>{props.date}</div>
    </div>
  );
}

function BodyTopButton(props) {
  const [isHovering, setIsHovering] = useState(false);

    const onMouseOver = () => setIsHovering(true);
    const onMouseOut=() => setIsHovering(false);

    return (
        <button onClick = {(event) => {
            event.preventDefault();
            props.onClick();
        }} 
        className={isHovering? "btbutton-hover" : "btbutton"}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}>
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
  let dataNum = 20;
  let sampleList = GenerateSampleData(dataNum);
  let rendering = [];
  for (let i = 0; i < sampleList.length; i++) {
    rendering.push(
      <Content
        id={sampleList[i].id}
        name={sampleList[i].name}
        date={sampleList[i].date}
      ></Content>
    );
  }

  return (
    <div className="body">
      <div className="body-top">
        <BodyTopButton 
        text="Personal"
        onClick= {() => {}}>
        </BodyTopButton>

        <BodyTopButton 
        text="Group"
        onClick= {() => {}}>
        </BodyTopButton>
      </div>
      <div className="body-second"></div>
      <div className="body-main">
        <div className="body-container">{rendering}</div>
      </div>
    </div>
  );
}

function GenerateSampleData(dataNum) {
  let sampleData = [];

  for (let index = 0; index < dataNum; index++) {
    sampleData.push({ id: index, name: ("Entity", index), date: "2020-05-15" });
  }

  return sampleData;
}

export default Body;
