import { IconButton, IconButtonProps } from "@chakra-ui/react";

export interface BaseIconButtonProps extends IconButtonProps {
  icon: any;
}

export default function BaseIconButton({ icon, ...props }: IconButtonProps) {
  return (
    <IconButton
      bg="none"
      color={"white"}
      borderRadius="8px"
      _hover={{
        // bg: "none",
        background: "#3B3D41",
      }}
      icon={icon}
      {...props}
    />
  );
}
