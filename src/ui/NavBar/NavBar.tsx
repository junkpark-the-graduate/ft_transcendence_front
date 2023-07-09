import React, { ReactNode } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import BaseAvatar from "../Avatar/Avatar";
import Search from "../Search/Search";
import { GoPencil, GoPersonFill, GoSignOut } from "react-icons/go";

const Links = [
  { label: "home", path: "/home" },
  { label: "game", path: "/game" },
  { label: "chat", path: "/chat" },
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
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: "#3B3D41",
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

export default function NavBar() {
  const router = useRouter();

  const handleLinkClick = (path: string) => {
    router.push(path);
  };

  return (
    <Box bg="none" borderRadius="15px" px={4}>
      <Flex h={12} alignItems={"center"} justifyContent={"space-between"}>
        <HStack spacing={8} alignItems={"center"}>
          <HStack as={"nav"} spacing={4} display={{ base: "flex", md: "flex" }}>
            {Links.map((link, index) => (
              <React.Fragment key={link.path}>
                <NavLink path={link.path}>{link.label}</NavLink>
                {index < Links.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
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
            <MenuList p="5px 10px" bg="#3B3D41" border={"none"}>
              <MenuItem
                icon={<GoPersonFill />}
                bg="#3B3D41"
                fontSize="11pt"
                onClick={() => {
                  handleLinkClick("/user/profile");
                }}
              >
                view profile
              </MenuItem>
              <MenuItem
                icon={<GoPencil />}
                bg="#3B3D41"
                fontSize="11pt"
                onClick={() => {
                  handleLinkClick("/user/edit");
                }}
              >
                edit profile
              </MenuItem>
              <MenuItem
                icon={<GoSignOut />}
                bg="#3B3D41"
                fontSize="10pt"
                textColor={"red"}
                onClick={() => {
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
