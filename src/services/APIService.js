import { useCookie } from "react-cookie";

function GetJWTToken() {
  const [cookies] = useCookie();
  cookies.get("jwt_token");
}

export { GetJWTToken };
