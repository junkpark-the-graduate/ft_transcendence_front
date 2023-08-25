import React, { ReactNode } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Center,
} from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import BaseAvatar from "../Avatar/Avatar";
import Search from "./Search";
import { GoPencil, GoPersonFill, GoSignOut } from "react-icons/go";
import { logout } from "@/utils/auth/logout";

const Links = [
  { label: "Game", path: "/game" },
  { label: "Channel", path: "/channel" },
  { label: "DM", path: "/dm" },
];

const NavLink = ({ children, path }: { children: ReactNode; path: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === path;

  const handleLinkClick = (path: string) => {
    router.push(path);
  };

  return (
    <Button
      key={path}
      h={8}
      px={2}
      py={1}
      bg="none"
      textColor={isActive ? "white" : "gray"}
      fontWeight={500}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: "none",
      }}
      _focus={{
        textDecoration: "none",
        bg: "none",
      }}
      onClick={() => handleLinkClick(path)}
    >
      {children}
    </Button>
  );
};

const Divider = () => (
  <Box
    key="divider"
    w={0.5}
    h={4}
    bg="gray"
    mx={2}
    display={{ base: "flex", md: "flex" }}
  />
);

export default function NavBar({}: {}) {
  const router = useRouter();

  const handleLinkClick = (path: string) => {
    router.push(path);
  };

  return (
    <Box bg="none" px={2} py={1}>
      <Flex h={12} alignItems={"center"}>
        <Text
          position="absolute"
          ml={2}
          as="button"
          onClick={() => {
            router.push(`/game`);
          }}
        >
          42 Ping Pong
        </Text>
        <Center flex="1">
          <Box bg="#29292D" borderRadius="8px" px={6} py={1}>
            <HStack spacing={8} alignItems={"center"}>
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "flex", md: "flex" }}
              >
                {Links.map((link, index) => (
                  <React.Fragment key={link.path}>
                    <NavLink path={link.path}>{link.label}</NavLink>
                    {index < Links.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </HStack>
            </HStack>
          </Box>
        </Center>
        <Flex alignItems={"center"} position="absolute" right="30px">
          <Search />
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
            >
              <BaseAvatar />
            </MenuButton>
            <MenuList p="5px 10px" bg="#414147" border={"none"}>
              <MenuItem
                icon={<GoPersonFill />}
                bg="#414147"
                fontSize="11pt"
                onClick={() => {
                  handleLinkClick("/user/profile");
                }}
              >
                view profile
              </MenuItem>
              <MenuItem
                icon={<GoPencil />}
                bg="#414147"
                fontSize="11pt"
                onClick={() => {
                  handleLinkClick("/user/edit");
                }}
              >
                edit profile
              </MenuItem>
              <MenuItem
                icon={<GoSignOut />}
                bg="#414147"
                fontSize="10pt"
                textColor={"red"}
                onClick={() => {
                  logout();
                  handleLinkClick("/");
                }}
              >
                logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
}
