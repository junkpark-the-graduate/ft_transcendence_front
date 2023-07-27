import { useEffect, useState } from "react";
import { EUserStatus } from "../types/EUserStatus";
import { socket } from "../socket";
import { Box } from "@chakra-ui/react";

export default function UserOnlineStatus() {
  const [userStatus, setUserStatus] = useState(EUserStatus.offline);

  useEffect(() => {
    // 서버로부터 상태 변경 이벤트를 수신하여 상태를 갱신
    socket.on("userStatusUpdate", ({ status }: any) => {
      setUserStatus(status);
      console.log(
        `User is now ${status === EUserStatus.online ? "online" : "offline"}`
      );
    });

    return () => {
      socket.off("userStatusUpdate"); // 컴포넌트 언마운트 시 이벤트 리스너를 정리
    };
  }, []);

  return (
    <Box>
      user status: {userStatus === EUserStatus.online ? "online" : "offline"}
    </Box>
  );
}
