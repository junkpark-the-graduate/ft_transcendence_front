import Cookies from "js-cookie";

export function getTokenClient() {
  const tokenCookie = Cookies.get("accessToken");
  return tokenCookie ? tokenCookie : null;
}
