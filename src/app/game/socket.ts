import Cookies from "js-cookie";
import { io } from "socket.io-client";

//const ENDPOINT = `${process.env.NEXT_PUBLIC_BACK_END_POINT}`;
const accessToken = Cookies.get("accessToken"); // get the accessToken from the cookie

export const socket = io(`${process.env.NEXT_PUBLIC_GAME_END_POINT}`, {
  query: {
    accessToken: accessToken,
  },
});

// send accessToken when connected
socket.on("connect", () => {
  console.log("connected to server");
});
