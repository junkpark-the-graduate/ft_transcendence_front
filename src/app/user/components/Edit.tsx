"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Switch,
  Divider,
  Box,
  Center,
  Image,
  Spacer,
  Flex,
  useToast,
} from "@chakra-ui/react";
import BaseButton from "@/ui/Button/Button";

type FormData = {
  name: string;
  twoFactorEnabled: boolean;
};

const Edit = () => {
  const toast = useToast();
  const [twoFactor, setTwoFactor] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const handleToggleAuth = () => {
    setTwoFactor(!twoFactor);
    toast({
      title: `Two-factor authentication ${twoFactor ? "disabled" : "enabled"}`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const router = useRouter();

  function getToken() {
    const tokenCookie = Cookies.get("accessToken");
    return tokenCookie ? tokenCookie : null;
  }

  async function onSubmit(data: FormData) {
    const token = getToken();
    console.log(token);
    const { name } = data;

    const res = await fetch("http://127.0.0.1:3001/user", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        twoFactorEnabled: twoFactor,
      }),
    });
    if (res.ok) {
      router.push("/user/profile");
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
              alt=""
            />
            <Divider m="20px 0px" />
            <FormLabel mb="10px" htmlFor="name">
              2FA 설정 변경하기{" "}
            </FormLabel>
            <Switch
              colorScheme="gray"
              isChecked={twoFactor}
              onChange={handleToggleAuth}
            >
              {twoFactor ? "2FA enabled" : "2FA disabled"}
            </Switch>
          </FormControl>
          <Divider m="20px 0px" />

          <Flex>
            <Spacer />
            <BaseButton
              text="변경사항 저장하기"
              isLoading={isSubmitting}
              type="submit"
              onClick={() => {}}
            />
          </Flex>
        </Box>
      </Center>
    </form>
  );
};

export default Edit;
