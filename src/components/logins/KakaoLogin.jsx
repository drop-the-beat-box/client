import React from "react";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";

function KakaoLogin() {
  const location = useLocation();
  const [cookies, setCookie, _] = useCookies();

  const token = location.search.split("=")[1];
  setCookie("jwt-token", token, { path: "/", secure: true });
  console.log(cookies);

  window.location.replace("/mainpage");

  return <></>;
}

export default KakaoLogin;
