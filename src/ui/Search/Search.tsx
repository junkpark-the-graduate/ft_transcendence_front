"use client";

import React, { useState } from "react";
import { Box, Flex, Input, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import BaseIconButton from "@/ui/Button/IconButton";
import { SearchIcon } from "@chakra-ui/icons";

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
            h={8}
            mr={3}
            borderRadius="8px"
            border="none"
            bg="#3B3D41"
            _hover={{
              background: "#191919",
            }}
            _focus={{
              borderColor: "#191919",
              background: "#191919",
            }}
            value={searchId}
            onChange={handleSearchInputChange}
            placeholder="search user"
          />
        ) : (
          <BaseIconButton
            h={8}
            mr={3}
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
