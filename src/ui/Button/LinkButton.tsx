import { ButtonProps, Flex } from "@chakra-ui/react";
import BaseButton from "./Button";
import { useRouter } from "next/navigation";
import { JSXElementConstructor, ReactElement } from "react";

export interface LinkButtonProps extends ButtonProps {
  text: string;
  goTo: string;
  icon?: ReactElement<any, string | JSXElementConstructor<any>> | undefined;
}

export default function LinkButton({ text, goTo, icon }: LinkButtonProps) {
  const router = useRouter();

  return (
    <BaseButton
      text={text}
      size="sm"
      onClick={() => {
        router.push(goTo);
      }}
      leftIcon={icon}
      my={1}
    >
      <Flex align="center">
        {icon && <span style={{ marginRight: "0.5em" }}>{icon}</span>}
      </Flex>
    </BaseButton>
  );
}
