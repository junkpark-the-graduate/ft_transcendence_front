import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@chakra-ui/react";

export const SignInButton = () => {
  const router = useRouter();

  return (
    <Button
      bg="none"
      borderRadius={0}
      textColor="white"
      border="white solid 3px"
      p="20px 30px"
      fontSize="20px"
      _hover={{ background: "#414147" }}
      _focus={{ background: "#414147" }}
      boxShadow={"5px 5px black"}
      onClick={() => {
        router.push(`${process.env.NEXT_PUBLIC_AUTH_URL}`);
      }}
    >
      sign in with 42 intra
    </Button>
  );
};
