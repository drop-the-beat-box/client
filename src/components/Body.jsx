import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import circle from "../img/circle.png";
import FileBody from "./FileBody";
import SharingBody from "./SharingBody";
import TrashcanBody from "./TrashcanBody";

// TODO: 컴포넌트 나누기.
// TODO: sharingFilePage 만들기.
// TODO: trashcan 만들기.
// TODO: 파일 삭제시 trashcan으로 이동하는것 만들기.
// TODO: trashcan에서 영구삭제 기능 만들기.
// TODO: DataService.js 필요한 api 뚫어놓기.

// TODO: sharingPage 만들기.
// TODO: Login 기능 연동하기.

// 최상위 컴포넌트
function Body({ currentPage }) {
  let bodyContent;
  if (currentPage === "myfilepage") {
    bodyContent = <FileBody />;
  } else if (currentPage === "sharingpage") {
    bodyContent = <SharingBody />;
  } else if (currentPage === "sharingfilepage") {
    bodyContent = <FileBody />;
  } else {
    bodyContent = <TrashcanBody />;
  }
  return bodyContent;
}

export default Body;
