"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
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
import RedButton from "@/ui/Button/RedButton";
import { getTokenClient, getUserData } from "./UserDetail";

type FormData = {
  name: string;
  image: string;
  twoFactorEnabled: boolean;
};

const Edit = () => {
  const userData = getUserData();
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
    console.log(selectedFile);
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
            <FormLabel mb="10px" htmlFor="name">
              이름 변경하기
            </FormLabel>
            <Flex>
              <Input
                required
                placeholder={userData?.name}
                borderRadius="15px"
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
                {...register("name", { required: "이름을 입력해주세요." })}
              />
              <BaseButton text="중복 검사" onClick={() => {}} />
            </Flex>
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
            <Divider m="20px 0px" />
            <FormLabel mb="10px" htmlFor="name">
              프로필 이미지 변경하기
            </FormLabel>
            <Input
              borderRadius="15px"
              border="none"
              bg="#3B3D41"
              type="file"
              pt="5px"
              mb="15px"
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
            <RedButton text="취소하기" mr={2} onClick={() => {}} />
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
