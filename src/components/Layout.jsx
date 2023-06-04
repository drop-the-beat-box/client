import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";
import Body from "./Body";

import React, { useEffect, useState } from "react";

function Layout({ currentPage }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzb25nbXMwOTA5QG5hdmVyLmNvbSIsImF1dGhvcml0aWVzS2V5IjpbeyJhdXRob3JpdHkiOiJST0xFX1VTRVIifV0sImV4cCI6MTY4NzEwNjYxNX0.GxGFnKxJafdlCZX7EptdPlpu9kTFx2aScqDDR36lx1MZF3dFgFGLk66zgwBgfc9LEx0JIx1UHsRG8HIrNJ00Tw";
    fetch("/member/files", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // 파일 정보를 상태로 설정합니다.
        setFiles([data]);
      })
      .catch((error) => {
        console.error("GET 요청 실패2:", error);
      });
  }, []);

  const addFile = (updatedFiles) => {
    setFiles(updatedFiles);
  };
  return (
    <div className="layout">
      <div className="top">
        <Header />
      </div>

      <div className="middle">
        <SideBar
          currentPage={currentPage}
          files={files}
          onAddFile={addFile}
        />
        <Body
          currentPage={currentPage}
          files={files}
          onAddFile={addFile}
        />
      </div>

      <div className="bottom">
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
