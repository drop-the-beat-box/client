import React from "react";
import { Link } from "react-router-dom";
import logoImage from "../img/mainlogo.png";

function LoginPage() {
  return (
    <div className="loginpage-container">
      <div className="loginpage-header">
        <div className="loginpage-header-title">
          <img src={logoImage} alt="logoImage" />
          <h1>DropTheBeatBox</h1>
        </div>
        <p>로그인하세요</p>
      </div>
      <div className="loginpage-body">
        <img src={logoImage} alt="logoImage" />

        <h2>Share With Friends.</h2>
        <h1>DropTheBeatBox</h1>
        <div>
          <Link
            className="loginpage-kakao-login-button"
            to="http://api.drop-the-beatbox.store/oauth2/authorization/kakao"
          >
            Kakao 로그인
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
