import { useMyData } from "@/hooks/useMyData";
import { Avatar, AvatarBadge, AvatarProps, Flex } from "@chakra-ui/react";

export interface BaseAvatarProps extends AvatarProps {}

export default function BaseAvatar({ ...props }: BaseAvatarProps) {
  const userData = useMyData();
  const status: string = "online";
  return (
    <Flex>
      <Avatar size="sm" src={userData?.image}>
        <AvatarBadge
          bg={status === "online" ? "green" : "red"}
          border="2px"
          borderColor="white"
          boxSize="1em"
        />
      </Avatar>
    </Flex>
  );
}
