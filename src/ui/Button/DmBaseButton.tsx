import { useEffect, useState } from "react";
import BaseButton from "@/ui/Button/Button";
import { ButtonProps, Flex, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { GoComment } from "react-icons/go";
import { fetchAsyncToBackEnd } from "@/utils/lib/fetchAsyncToBackEnd";

export interface DmBaseButtonProps extends ButtonProps {
  userId: number | undefined;
  icon: boolean;
}

export default function DmBaseButton({
  userId,
  icon,
  ...props
}: DmBaseButtonProps) {
  const router = useRouter();
  const toast = useToast();
  const [error, setError] = useState<Error | null>(null);

  if (error) throw error;

  useEffect(() => {}, []);

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
      <BaseButton
        textColor={"white"}
        flex="1"
        size="sm"
        leftIcon={<GoComment />}
        text="message"
        onClick={handleConnectDm}
        bg="#414147"
        style={{ whiteSpace: "nowrap" }} // 텍스트 길이를 고정
        {...props}
      />
    </Flex>
  ) : (
    <Flex>
      <BaseButton
        w="85px"
        flex="1"
        fontSize={14}
        size="sm"
        text="message"
        onClick={handleConnectDm}
        bg="#414147"
        style={{ whiteSpace: "nowrap" }} // 텍스트 길이를 고정
        {...props}
      />
    </Flex>
  );
}
