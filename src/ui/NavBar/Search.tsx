"use client";

import React, { useState } from "react";
import { Flex, Input, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import BaseIconButton from "@/ui/Button/IconButton";
import { SearchIcon } from "@chakra-ui/icons";
import { fetchAsyncToBackEnd } from "@/utils/lib/fetchAsyncToBackEnd";

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

  const handleSearchKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      await handleSearchIconClick();
    }
  };

  const handleSearchIconClick = async () => {
    if (searchId.trim() === "") {
      return;
    }
    const res = await fetchAsyncToBackEnd(`/user/search/${searchId}`);
    const data = await res.json();
    if (res.status == 200) {
      router.push(`/user/profile/${data.id}`);
    } else if (res.status == 404) {
      toast({
        title: "존재하지 않는 유저입니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex alignItems={"center"}>
      {searchOpen ? (
        <Input
          w="180px"
          h={8}
          mr={2}
          bg="#29292D"
          textColor="white"
          variant="filled"
          border="none"
          borderRadius="8px"
          value={searchId}
          onChange={handleSearchInputChange}
          onKeyDown={handleSearchKeyDown}
          placeholder="user name or ID"
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
          mr={2}
          h={8}
          icon={<SearchIcon />}
          aria-label="search"
          onClick={handleSearchToggle}
          onMouseDown={handleSearchIconClick}
        />
      )}
    </Flex>
  );
}
