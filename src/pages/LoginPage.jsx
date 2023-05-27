import React from "react";
import logoImage from "../img/mainlogo.png";
import MainPage from "./MainPage";

function LoginPage() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          paddingLeft: 100,
          paddingRight: 100,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            height: 72,
            marginLeft: 8,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <img src={logoImage} width={40} height={40} />
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#7B95B7" }}>
            DropTheBeatBox
          </h1>
        </div>
        <p style={{ fontSize: 16, fontWeight: 400, color: "#7B95B7" }}>
          로그인하세요
        </p>
      </div>
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: "#7B95B7",
          }}
        >
          Share With Friends.
        </h2>
        <h1
          style={{
            fontSize: 60,
            fontWeight: 700,
            color: "#486284",
          }}
        >
          DropTheBeatBox
        </h1>
        <div>
          <button
            onClick={() => {
              window.location.replace("/mainpage");
            }}
          >
            Google
          </button>
          <button
            onClick={() => {
              window.location.replace("/mainpage");
            }}
          >
            Kakao
          </button>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
