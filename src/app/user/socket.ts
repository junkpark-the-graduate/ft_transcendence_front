import Cookies from "js-cookie";
import { io } from "socket.io-client";

//const ENDPOINT = `${process.env.NEXT_PUBLIC_BACK_END_POINT}`;
const ENDPOINT = "ws://localhost:4242/user";
const accessToken = Cookies.get("accessToken"); // get the accessToken from the cookie

export const socket = io(ENDPOINT, {
  query: {
    accessToken: accessToken,
  },
  transports: ["websocket"], // 웹 소켓 사용으로 설정
});

// send accessToken when connected
socket.on("connect", () => {
  console.log("connected to server");
});

socket.on("disconnect", () => {
  console.log("disconnected from server");
});
