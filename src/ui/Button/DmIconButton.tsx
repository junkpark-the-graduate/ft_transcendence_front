"use client";
import { useEffect, useState } from "react";
import { Flex, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import IconButton from "./IconButton";
import { fetchAsyncToBackEnd } from "@/utils/lib/fetchAsyncToBackEnd";

export default function DmIconButton({
  userId,
  icon,
}: {
  userId: number | undefined;
  icon: any;
}) {
  const router = useRouter();
  const toast = useToast();
  const [error, setError] = useState<Error | null>(null);

  if (error) throw error;

  const createDm = async (userId: number | undefined) => {
    try {
      const res = await fetchAsyncToBackEnd(
        `/channel/direct?memberId=${userId}`,
        {
          method: "POST",
        }
      );

      return res;
    } catch (err: any) {
      setError(err);
    }
  };

  useEffect(() => {}, []);

  const handleConnectDm = async () => {
    const resCreateDm = await createDm(userId);
    if (!resCreateDm) return;

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
