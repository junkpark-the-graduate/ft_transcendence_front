import BaseButton from "@/ui/Button/Button";
import { Button } from "@chakra-ui/react";

export const GameStartButton = () => {
  return (
    <Button
      bg="none"
      borderRadius={0}
      textColor="white"
      border="white solid 2px"
      p="20px 30px"
      fontSize="20px"
      _hover={{ background: "#414147" }}
      _focus={{ background: "#414147" }}
      onClick={() => {
        console.log("game start");
      }}
    >
      play game
    </Button>
  );
};
