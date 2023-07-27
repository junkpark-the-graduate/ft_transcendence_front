import { socket } from "@/app/user/socket";
import { EUserStatus } from "@/app/user/types/EUserStatus";
import { useEffect, useState } from "react";

export function getUserStatus(userId: number) {
  const [userStatus, setUserStatus] = useState<EUserStatus>(
    EUserStatus.offline
  );

  useEffect(() => {
    // 서버로부터 상태 변경 이벤트를 수신하여 상태를 갱신
    socket.emit("getUserStatusById", userId); // 서버로 유저의 상태 요청

    const handleUserStatusUpdate = ({
      userId: receivedUserId,
      status,
    }: any) => {
      if (receivedUserId === userId) {
        setUserStatus(status);
        console.log(
          `User ${userId} is now ${
            status === EUserStatus.online ? "online" : "offline"
          }`
        );
      }
    };

    socket.on("userStatusUpdate", handleUserStatusUpdate);

    // 컴포넌트 언마운트 시 이벤트 리스너를 정리
    return () => {
      socket.off("userStatusUpdate", handleUserStatusUpdate);
    };
  }, [userId]);

  return userStatus;
}
