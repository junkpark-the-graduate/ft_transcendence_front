import { IconButton, IconButtonProps } from "@chakra-ui/react";

export interface BaseIconButtonProps extends IconButtonProps {
  icon: any;
}

// https://react-icons.github.io/react-icons/search?q=search
export default function BaseIconButton({ icon, ...props }: IconButtonProps) {
  return (
    <IconButton
      bg="#3B3D41"
      m="5px"
      color={"white"}
      borderRadius="15px"
      _hover={{
        background: "#3B3D41",
      }}
      icon={icon}
      {...props}
    />
  );
}
