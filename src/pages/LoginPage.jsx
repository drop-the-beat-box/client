import React from "react";
import { Link } from "react-router-dom";
import logoImage from "../img/mainlogo.png";
import MainPage from "./MainPage";

function LoginPage() {
  return (
    <>
      <div className="loginpage-container">
        <div className="loginpage-header">
          <img src={logoImage} alt="logoImage" width={40} height={40} />
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
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={logoImage} alt="logoImage" width={600} height={500} />

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
          <Link
            className="loginpage-kakao-login-button"
            to="http://api.drop-the-beatbox.store/oauth2/authorization/kakao"
          >
            Kakao 로그인
          </Link>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
