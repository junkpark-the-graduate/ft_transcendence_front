import { useUserDataContext } from "@/context/UserDataContext";
import { Avatar, AvatarBadge, AvatarProps, Flex } from "@chakra-ui/react";

export interface BaseAvatarProps extends AvatarProps {}

export default function BaseAvatar({ ...props }: BaseAvatarProps) {
  const { myData } = useUserDataContext();

  return (
    <Flex>
      <Avatar size="sm" name={myData?.name} src={myData?.image}>
        <AvatarBadge
          bg="green"
          border="2px"
          borderColor="white"
          boxSize="1em"
        />
      </Avatar>
    </Flex>
  );
}
