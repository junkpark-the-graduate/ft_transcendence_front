"use client";

import React from "react";
import { Button } from "@chakra-ui/react";

export const Loading = () => {
  return (
    <Button
      isLoading
      loadingText="signing in"
      spinnerPlacement="start"
      bg="none"
      borderRadius={0}
      textColor="white"
      border="white solid 3px"
      p="20px 30px"
      fontSize="20px"
      _hover={{ background: "#414147" }}
      _focus={{ background: "#414147" }}
    />
  );
};
