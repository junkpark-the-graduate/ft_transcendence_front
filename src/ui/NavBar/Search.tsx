"use client";

import React, { useState } from "react";
import { Flex, Input, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import BaseIconButton from "@/ui/Button/IconButton";
import { SearchIcon } from "@chakra-ui/icons";
import BaseInput from "../Input/Input";

export default function Search() {
  const router = useRouter();
  const toast = useToast();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchId, setSearchId] = useState("");

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
    setSearchId("");
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchId(event.target.value);
  };

  const handleSearchIconClick = async () => {
    if (searchId.trim() !== "") {
      try {
        const res = await fetch(`http://127.0.0.1:3001/user/${searchId}`, {
          method: "Get",
        });
        const userData = await res.json();
        router.push(`/user/profile/${searchId}`);
      } catch (err) {
        toast({
          title: `fail to find user id: ${searchId}`,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <>
      <Flex alignItems={"center"}>
        {searchOpen ? (
          <Input
            w="150px"
            h={8}
            mr={2}
            bg="#29292D"
            textColor="white"
            variant="filled"
            border="none"
            borderRadius="8px"
            value={searchId}
            onChange={handleSearchInputChange}
            placeholder="search user"
            _hover={{
              background: "#414147",
            }}
            _focus={{
              borderColor: "#414147",
              background: "#414147",
            }}
          />
        ) : (
          <BaseIconButton
            h={8}
            mr={2}
            icon={<SearchIcon />}
            aria-label="search"
            onClick={handleSearchToggle}
          />
        )}
        {searchOpen && (
          <BaseIconButton
            mr={3}
            h={8}
            icon={<SearchIcon />}
            aria-label="search"
            onClick={handleSearchToggle}
            onMouseDown={handleSearchIconClick}
          />
        )}
      </Flex>
    </>
  );
}
