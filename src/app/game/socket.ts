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

// chat.page.tsx
// import @/game/socket
// socket = socket;
// socket.emit("create_room", 상대 정보, (data) => {
// {url} = data;
// 메세지 보내주고
// chatsocket.emit("message", ftID, url);
// router.push(url);
// 라우팅?
// })
