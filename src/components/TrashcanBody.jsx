import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
// 현재 내 파일들 목록 조회 (getMyFiles)
// 휴지통 api 개발되면 휴지통 목록 조회로 변경
import { getMyFiles } from "../services/APIService";
import { getTrashFiles } from "../services/APIService";

import ReactLoading from "react-loading";
import Content from "./Content";
import file from "../img/file.png";

function TrashcanBody() {
  const Filter = {
    Image: 0,
    Video: 1,
    Document: 2,
    Favorite: 3,
  };

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

  const [filter, setFilter] = useState(Filter.Image);
  const [items, setItems] = useState([]);
  const [cookies] = useCookies();
  const token = cookies["jwt-token"];
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    getTrashFiles(token).then((result) => {
      setItems(
        result.map((item) => (
          <Content
            identifier="Trash"
            id={item.fileId}
            name={item.name}
            type={getType(item.imageUrl)}
            remainDay={item.remainDay}
          ></Content>
        ))
      );
      setIsLoading(false);
    });
  }, [filter]);

  return (
    <div className="trashbody">
      {isLoading ? (
        <div className="trash-loading">
          <ReactLoading
            type="bars"
            color="#415165"
          ></ReactLoading>
        </div>
      ) : (
        <div className="trashbody-container">{items}</div>
      )}
    </div>
  );
}

export default TrashcanBody;
