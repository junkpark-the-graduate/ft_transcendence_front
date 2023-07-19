"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
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
  Text,
} from "@chakra-ui/react";
import BaseButton from "@/ui/Button/Button";
import RedButton from "@/ui/Button/RedButton";
import { getTokenClient } from "@/utils/auth/getTokenClient";
import { getMyData } from "@/utils/user/getMyData";

type FormData = {
  name: string;
  image: string;
  twoFactorEnabled: boolean;
};

const Edit = () => {
  const userData = getMyData();
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  //--------------------------------------------------------------
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();
  //--------------------------------------------------------------
  const toast = useToast();
  const [twoFactor, setTwoFactor] = useState(userData?.twoFactorEnabled);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  useEffect(() => {
    if (userData) {
      setTwoFactor(userData.twoFactorEnabled);
    }
  }, [userData]);

  const handleToggleAuth = () => {
    setTwoFactor(!twoFactor);
    toast({
      title: `Two-factor authentication ${twoFactor ? "disabled" : "enabled"}`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  async function onSubmit(data: FormData) {
    const { name } = data;

    // 이름 유효성 검사 1 ---------------------------------------------
    if (name.length > 20) {
      toast({
        title: "이름 변경 실패",
        description: "새로운 이름은 20자 이하여야 합니다.",
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
        description: '새로운 이름에는 "#"가 포함될 수 없습니다.',
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    // ------------------------------------------------------------
    const formData = new FormData();
    if (selectedFile) {
      formData.append("file", selectedFile);
      formData.append("filename", selectedFile.name);

      const res = await fetch("http://127.0.0.1:3001/user/upload", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${getTokenClient()}`,
        },
        body: formData,
      });
      if (!res.ok) {
        console.log("Failed to update user image");
      }
    }
    setUploading(true);
    const res = await fetch("http://127.0.0.1:3001/user", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${getTokenClient()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        twoFactorEnabled: twoFactor,
      }),
    });
    if (res.ok) {
      setUploading(false);
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
            <Divider m="20px 0px" />
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
                bg="#414147"
                textColor="white"
                type="name"
                id="name"
                mr={2}
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
            <Divider m="20px 0px" />
            <FormLabel mb="10px" htmlFor="name">
              {">"} 프로필 이미지 변경하기
            </FormLabel>
            <Flex alignItems="center">
              <div>
                {selectedImage ? (
                  <Image
                    mx="10px"
                    borderRadius="full"
                    boxSize="120px"
                    src={selectedImage}
                    alt=""
                  />
                ) : (
                  <Image
                    mx="10px"
                    borderRadius="full"
                    boxSize="120px"
                    src={userData?.image}
                    alt=""
                  />
                )}
              </div>
              <Spacer />
              <Flex flexDirection="column"></Flex>
            </Flex>
            <Text fontSize={13} ml={1} my={2} textColor="gray">
              .jpg 혹은 .png 형식의 이미지 파일만 업로드 가능합니다.
            </Text>
            <Input
              borderRadius="8px"
              border="none"
              bg="#414147"
              type="file"
              pt="5px"
              _hover={{
                background: "#191919",
              }}
              _focus={{
                background: "#191919",
                borderColor: "#191919",
              }}
              onChange={({ target }) => {
                if (target.files) {
                  const file = target.files[0];
                  setSelectedImage(URL.createObjectURL(file));
                  setSelectedFile(file);
                }
              }}
            />
            <Divider m="20px 0px" />
            <FormLabel mb="10px" htmlFor="name">
              {">"} 2FA 설정 변경하기{" "}
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
