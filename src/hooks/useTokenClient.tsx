import Cookies from "js-cookie";

export function useTokenClient() {
  const tokenCookie = Cookies.get("accessToken");
  return tokenCookie ? tokenCookie : null;
}
