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
import RedButton from "@/ui/Button/RedButton";
import { getTokenClient, getUserData } from "./UserDetail";
import axios from "axios";

type FormData = {
  name: string;
  image: string;
  twoFactorEnabled: boolean;
};

const Edit = () => {
  const userData = getUserData();
  const router = useRouter();
  //--------------------------------------------------------------
  const [uploading, setUploading] = useState(false);
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

  const handleUpload = async () => {
    setUploading(true);
    try {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append("myImage", selectedFile);
      const { data } = await axios.post("/#", formData);
      console.log(data);
    } catch (err: any) {
      console.log(err.response?.data);
    }
    setUploading(false);
  };

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
    const token = getTokenClient();
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
            <Flex>
              <Input
                required
                placeholder={userData?.name}
                type="name"
                id="name"
                mr={3}
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
              type="file"
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
              <Flex flexDirection="column">
                <BaseButton text="이미지 업로드" mt={9} onClick={() => {}} />
                <RedButton text="이미지 삭제" mt={3} onClick={() => {}} />
              </Flex>
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
