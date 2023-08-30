import { socket } from "@/app/game/socket";
import Cookies from "js-cookie";

export function logout() {
  socket.disconnect();
  Cookies.remove("accessToken");
}
