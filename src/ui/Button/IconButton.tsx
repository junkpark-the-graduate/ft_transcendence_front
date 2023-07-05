import { IconButton, IconButtonProps } from "@chakra-ui/react";

export interface BaseIconButtonProps extends IconButtonProps {
  icon: any;
}

// https://react-icons.github.io/react-icons/search?q=search
export default function BaseIconButton({ icon, ...props }: IconButtonProps) {
  return (
    <IconButton
      bg="none"
      // bg="#3B3D41"
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
