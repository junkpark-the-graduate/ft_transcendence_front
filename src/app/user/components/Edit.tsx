"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FormLabel,
  FormControl,
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
import { getMyData } from "@/utils/user/getMyData";
import BaseHeading from "@/ui/Typo/Heading";
import BaseInput from "@/ui/Input/Input";
import FileInput from "@/ui/Input/FileInput";
import FullBox from "@/ui/Box/FullBox";
import { fetchAsyncToBackEnd } from "@/utils/lib/fetchAsyncToBackEnd";

type FormData = {
  name: string;
  image: string;
  twoFactorEnabled: boolean;
};

const Edit = () => {
  const userData = getMyData();
  const router = useRouter();
  const [inputName, setInputName] = useState("");
  const [isNameValid, setIsNameValid] = useState(0);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [twoFactor, setTwoFactor] = useState(userData?.twoFactorEnabled);
  const [isUploading, setIsUploading] = useState(false);
  const toast = useToast();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>();

  useEffect(() => {
    if (userData) {
      setTwoFactor(userData.twoFactorEnabled);
    }
  }, [userData]);

  const checkDuplicateName = async (name: string) => {
    try {
      const res = await fetchAsyncToBackEnd(`/user/check-name?name=${name}`, {
        method: "POST",
      });
      const data = await res.json();
      return data.isDuplicate;
    } catch (error) {
      console.error("Error checking duplicate name:", error);
      return false;
    }
  };

  const handleNameValidation = async () => {
    const finalName = inputName || userData?.name || "";
    const numericRegex = /^[0-9]+$/;
    const nameRegex = /^[a-zA-Z0-9]+$/;

    if (!inputName) {
      toast({
        description: "먼저 이름을 입력해주세요.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setIsNameValid(0);
      return;
    }
    if (finalName == userData?.name) {
      toast({
        description: "현재 사용 중인 이름입니다.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setIsNameValid(1);
      return;
    }
    if (finalName.length > 20) {
      toast({
        description: "이름은 20자 이하여야 합니다.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setIsNameValid(2);
      return;
    }
    if (numericRegex.test(finalName)) {
      toast({
        description: "숫자로만 구성된 이름은 사용이 불가합니다.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setIsNameValid(2);
      return;
    }
    if (!nameRegex.test(finalName)) {
      toast({
        description: "이름은 알파벳과 숫자만 포함해야 합니다.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setIsNameValid(2);
      return;
    }

    const isDuplicate = await checkDuplicateName(finalName);

    if (isDuplicate) {
      toast({
        description: "이미 존재하는 이름입니다.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setIsNameValid(2);
      return;
    }
    toast({
      description: "사용 가능한 이름입니다.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    setIsNameValid(1);
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

  async function onSubmit() {
    const newName = inputName || userData?.name || "";

    if (isNameValid == 2) {
      toast({
        description: "이름 검사를 진행해주세요.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();

    if (selectedFile) {
      formData.append("file", selectedFile);
      formData.append("filename", selectedFile.name);

      const res = await fetchAsyncToBackEnd("/user/upload", {
        method: "PATCH",
        body: formData,
      });
      if (!res.ok) {
        console.log("Failed to update user image");
      }
    }
    setIsUploading(true);
    const res = await fetchAsyncToBackEnd("/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName,
        twoFactorEnabled: twoFactor,
      }),
    });
    if (res.ok) {
      setIsUploading(false);
      router.push("/user/profile");
      router.refresh();
    } else {
      console.log("Failed to update user");
    }
  }

  return (
    <FullBox>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Center>
          <Box bg="#29292D" w="500px" p="40px 60px" borderRadius={"15px"}>
            <BaseHeading text="edit profile" />
            <Divider my="5" />
            <FormControl>
              <FormLabel mb="10px" htmlFor="name">
                {">"} 이름 변경하기
              </FormLabel>
              <Text fontSize={13} ml={1} mb={2} textColor="gray">
                알파벳과 숫자로 구성된 20자 이내의 이름을 입력해주세요.
              </Text>
              <Flex>
                <BaseInput
                  type="name"
                  placeholder={userData?.name || ""}
                  mr={2}
                  onChange={(e) => {
                    setInputName(e.target.value);
                    setIsNameValid(2);
                  }}
                />
                <BaseButton text="검사하기" onClick={handleNameValidation} />
              </Flex>
              <Divider my="5" />
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
              <FileInput
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={({ target }) => {
                  if (target.files) {
                    const file = target.files[0];
                    setSelectedImage(URL.createObjectURL(file));
                    setSelectedFile(file);
                  }
                }}
              />
              <Divider my="5" />
              <FormLabel mb="10px" htmlFor="name">
                {">"} 2FA 설정 변경하기
              </FormLabel>
              <Switch
                colorScheme="gray"
                isChecked={twoFactor}
                onChange={handleToggleAuth}
              >
                {twoFactor ? "2FA enabled" : "2FA disabled"}
              </Switch>
            </FormControl>
            <Divider my="5" />
            <Flex>
              <Spacer />
              <RedButton text="취소하기" mr={2} />
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
    </FullBox>
  );
};

export default Edit;
