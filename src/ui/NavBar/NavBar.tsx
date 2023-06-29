"use client";

import { ReactNode } from "react";
import {
  Box,
  Button,
  Flex,
  Avatar,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const Links = ["home", "game", "chat"];

const NavLink = ({ children, path }: { children: ReactNode; path: string }) => (
  <Link
    key={path} // key 속성 추가
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: "#3B3D41",
    }}
    href={path}
  >
    {children}
  </Link>
);

const Divider = () => (
  <Box
    key="divider" // key 속성 추가
    w={0.5}
    h={4}
    bg="white"
    mx={2}
    display={{ base: "none", md: "block" }}
  />
);

export default function NavBar() {
  const router = useRouter();

  const handleLinkClick = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <Box bg="#29292D" borderRadius="15px" px={4}>
        <Flex h={12} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link, index) => (
                <>
                  <NavLink key={link} path={`/${link}`}>
                    {link}
                  </NavLink>
                  {index < Links.length - 1 && <Divider />}
                </>
              ))}
            </HStack>
          </HStack>

          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} bg="#1F1F22" />
              </MenuButton>
              <MenuList p="5px 10px" bg="#3B3D41" border={"none"}>
                <MenuItem
                  bg="#3B3D41"
                  fontSize="10pt"
                  onClick={() => {
                    handleLinkClick("/user/profile");
                  }}
                >
                  view profile
                </MenuItem>
                <MenuItem
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
    </>
  );
}
