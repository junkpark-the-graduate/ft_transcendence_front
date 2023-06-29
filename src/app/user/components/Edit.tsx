"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React from "react";

import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Switch,
  Divider,
  Text,
  Box,
  Center,
  Image,
  Spacer,
  Flex,
} from "@chakra-ui/react";
import { SubmitHandler } from "react-hook-form";
import BaseButton from "@/ui/Button/Button";

type FormData = {
  name: string;
};

const Edit = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const router = useRouter();

  function getToken() {
    const tokenCookie = Cookies.get("accessToken");
    return tokenCookie ? tokenCookie : null;
  }

  async function onSubmit(data: FormData) {
    const token = getToken();
    const { name } = data;

    const res = await fetch("http://127.0.0.1:3001/user", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
      }),
    });
    if (res.ok) {
      router.push("/user");
      router.refresh();
    } else {
      console.log("Failed to update user");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Center>
        <Box bg="#29292D" w="500px" p="40px 60px" borderRadius={"15px"}>
          <FormControl>
            <FormLabel mb="10px" htmlFor="name">
              이름 변경하기
            </FormLabel>
            <Input
              required
              placeholder="new name"
              type="name"
              id="name"
              {...register("name", { required: "이름을 입력해주세요." })}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
            <Divider m="20px 0px" />
            <FormLabel mb="10px" htmlFor="name">
              프로필 이미지 변경하기
            </FormLabel>
            <Image
              mx="10px"
              borderRadius="full"
              boxSize="120px"
              src="https://bit.ly/dan-abramov"
              alt="Dan Abramov"
            />
            <Divider m="20px 0px" />
          </FormControl>
          <Flex>
            <Spacer />
            <Button colorScheme="gray" isLoading={isSubmitting} type="submit">
              변경사항 저장하기
            </Button>
          </Flex>
        </Box>
      </Center>
    </form>
  );
};

export default Edit;
