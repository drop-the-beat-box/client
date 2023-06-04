import React from "react";
import Content from "./Content";
import file from "../img/file.png";
import { render } from "@testing-library/react";

function TrashcanBody() {
  let dataNum = 30;
  let sampleList = GenerateSampleData(dataNum);
  let rendering = [];
  function GenerateSampleData(dataNum) {
    let sampleData = [];
    for (let index = 0; index < dataNum; index++) {
      sampleData.push({
        id: index,
        name: "Entity " + index,
        date: "생성일 : 2020-05-15",
        imageFile: { file },
        type: "0",
      });
    }

    return sampleData;
  }

  for (let i = 0; i < sampleList.length; i++) {
    if (sampleList[i].isDeleted) {
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
  return (
    <div className="trashbody">
      <div className="trashbody-main">{rendering}</div>
    </div>
  );
}

export default TrashcanBody;
