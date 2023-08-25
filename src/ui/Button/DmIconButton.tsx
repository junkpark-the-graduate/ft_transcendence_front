import { useEffect } from "react";
import { Flex, useToast } from "@chakra-ui/react";
import { createDm } from "@/utils/channel/dm";
import { useRouter } from "next/navigation";
import IconButton from "./IconButton";

export default function DmIconButton({
  userId,
  icon,
}: {
  userId: number | undefined;
  icon: any;
}) {
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {}, []);

  const handleConnectDm = async () => {
    const resCreateDm = await createDm(userId);
    const resCreateDmJson = await resCreateDm.json();

    if (resCreateDm.status < 300) {
      router.push(`/channel/${resCreateDmJson.id}/chat-room`);
    } else {
      toast({
        title: resCreateDmJson.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return icon ? (
    <Flex>
      <IconButton
        size="sm"
        icon={icon}
        onClick={handleConnectDm}
        aria-label="connectDm"
      />
    </Flex>
  ) : (
    <Flex>
      <IconButton
        size="sm"
        icon={icon}
        onClick={handleConnectDm}
        aria-label="connectDm"
      />
    </Flex>
  );
}
