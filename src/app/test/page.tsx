"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FormLabel,
  FormControl,
  Input,
  Divider,
  Box,
  Center,
  Spacer,
  Flex,
  useToast,
  Text,
} from "@chakra-ui/react";
import BaseButton from "@/ui/Button/Button";
import RedButton from "@/ui/Button/RedButton";
import { getTokenClient, getUserData } from "../user/components/UserDetail";

type FormData = {
  name: string;
};

// 중복 검사 함수
const checkDuplicateName = async (name: string) => {
  const response = await fetch(`http://127.0.0.1:3001/user/${name}`);
  console.log(response);
  if (response.ok) {
    const data = await response.json();
    return data.exists;
  }
  return false;
};

const Edit = () => {
  const userData = getUserData();
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  async function onSubmit(data: FormData) {
    const { name } = data;

    // 이름 유효성 검사 1 ---------------------------------------------
    if (name.length > 20) {
      toast({
        title: "이름 변경 실패",
        description: "이름은 20자 이하여야 합니다.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    // 이름 유효성 검사 2 ---------------------------------------------
    if (name.includes("#")) {
      toast({
        title: "이름 변경 실패",
        description: "이름에는 '#' 문자가 포함될 수 없습니다.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    // 중복 검사 --------------------------------------------------------
    const isDuplicate = await checkDuplicateName(name);
    if (isDuplicate) {
      toast({
        title: "이름 변경 실패",
        description: "이미 해당 이름을 사용하는 사용자가 있습니다.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // ------------------------------------------------------------
    const formData = new FormData();
    const res = await fetch("http://127.0.0.1:3001/user", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${getTokenClient()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        twoFactorEnabled: false,
      }),
    });
    if (res.ok) {
      setUploading(true);
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
              {">"} 이름 변경하기
            </FormLabel>
            <Text fontSize={13} ml={1} mb={2} textColor="gray">
              20자 이내이며 '#' 문자를 포함하지 않은 이름만 가능합니다.
            </Text>
            <Flex>
              <Input
                placeholder={userData?.name}
                borderRadius="8px"
                border="none"
                bg="#3B3D41"
                textColor="white"
                type="name"
                id="name"
                mr={3}
                _hover={{
                  background: "#191919",
                }}
                _focus={{
                  background: "#191919",
                  borderColor: "#191919",
                }}
                {...register("name", {
                  required: "이름을 입력해주세요.",
                })}
              />
              <BaseButton text="중복 검사" onClick={() => {}} />
            </Flex>
          </FormControl>
          <Divider m="20px 0px" />

          <Flex>
            <Spacer />
            <RedButton
              text="취소하기"
              mr={2}
              onClick={() => {
                router.back();
              }}
            />
            <BaseButton
              text="저장하기"
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
