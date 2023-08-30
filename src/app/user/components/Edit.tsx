"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FormLabel,
  FormControl,
  Switch,
  Divider,
  Image,
  Spacer,
  Flex,
  useToast,
  Text,
} from "@chakra-ui/react";
import BaseButton from "@/ui/Button/Button";
import RedButton from "@/ui/Button/RedButton";
import BaseHeading from "@/ui/Typo/Heading";
import BaseInput from "@/ui/Input/Input";
import FileInput from "@/ui/Input/FileInput";
import { uploadUserInfo } from "@/utils/edit/uploadUserInfo";
import { uploadUserImg } from "@/utils/edit/uploadUserImg";
import { checkDuplicateName } from "@/utils/edit/checkDuplicateName";
import { MyData, useUserDataContext } from "@/context/UserDataContext";
import BaseIconButton from "@/ui/Button/IconButton";
import { GoArrowLeft } from "react-icons/go";

type FormData = {
  name: string;
  image: string;
  twoFactorEnabled: boolean;
};

const Edit = () => {
  const { myData, setMyData } = useUserDataContext();
  const router = useRouter();
  const [inputName, setInputName] = useState("");
  const [isNameValid, setIsNameValid] = useState(0);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [twoFactor, setTwoFactor] = useState<boolean | undefined>(
    myData?.twoFactorEnabled
  );
  const [isUploading, setIsUploading] = useState(false);
  const toast = useToast();
  const [imageURL, setImageURL] = useState("");
  const [error, setError] = useState(null);

  if (error) {
    throw error;
  }

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>();

  useEffect(() => {
    if (myData) {
      setTwoFactor(myData.twoFactorEnabled);
    }
  }, [myData]);

  const handleToggleAuth = () => {
    if (twoFactor !== undefined) {
      setTwoFactor(!twoFactor);
      toast({
        title: `Two-factor authentication ${
          twoFactor ? "disabled" : "enabled"
        }`,
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleNameValidation = async () => {
    const finalName = inputName || myData?.name || "";
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
    if (finalName == myData?.name) {
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
        description: "알파벳과 숫자 이외의 문자는 사용이 불가합니다.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setIsNameValid(2);
      return;
    }

    const isDuplicate = await checkDuplicateName(finalName).catch(setError);

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

  async function onSubmit() {
    const newName = inputName || myData?.name || "";

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
    try {
      const newImg: string = await uploadUserImg(selectedFile, formData);
      setImageURL(newImg);
    } catch (err: any) {
      setError(err);
      return;
    }

    uploadUserInfo(newName, twoFactor, setIsUploading).catch(setError);

    if (!isUploading && myData && twoFactor !== undefined) {
      const updatedMyData: MyData = {
        ...myData,
        name: newName,
        twoFactorEnabled: twoFactor,
        image: imageURL || myData.image,
      };
      setMyData(updatedMyData);

      router.push("/user/profile");
      router.refresh();
    }
  }

  return (
    <Flex mx={2} mt={1} direction="column">
      <Flex alignItems="center">
        <BaseIconButton
          size="sm"
          icon={<GoArrowLeft />}
          aria-label="go back"
          onClick={() => {
            router.back();
          }}
        />
        <BaseHeading ml={1} text="edit profile" />
      </Flex>
      <Divider mt={2} mb={4} />
      <FormControl px={4}>
        <FormLabel mb={5} htmlFor="name" ml={2}>
          {">"} 이름 변경하기
        </FormLabel>
        <Text fontSize={13} ml={6} mb={2} textColor="gray">
          알파벳과 숫자로 구성된 20자 이내의 이름을 입력해주세요.
        </Text>
        <Flex>
          <BaseInput
            w="380px"
            type="name"
            placeholder={myData?.name || ""}
            mr={2}
            ml={6}
            onChange={(e) => {
              setInputName(e.target.value);
              setIsNameValid(2);
            }}
          />
          <BaseButton text="검사하기" onClick={handleNameValidation} />
        </Flex>
        <Divider my={4} />
        <FormLabel mb={5} htmlFor="name" ml={2}>
          {">"} 프로필 이미지 변경하기
        </FormLabel>
        <Flex alignItems="center" ml={6}>
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
                src={myData?.image}
                alt=""
              />
            )}
          </div>
          <Spacer />
        </Flex>
        <Text fontSize={13} ml={6} my={2} textColor="gray">
          .jpg 혹은 .png 형식의 이미지 파일만 업로드 가능합니다.
        </Text>
        <Flex>
          <FileInput
            ml={6}
            w="500px"
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
        </Flex>
        <Divider my={4} />
        <FormLabel mb="10px" htmlFor="name" ml={2}>
          {">"} 2FA 설정 변경하기
        </FormLabel>
        <Text fontSize={13} ml={6} my={2} textColor="gray">
          2FA enabled일 경우 다음 로그인부터 이메일 인증을 요구합니다.
        </Text>
        <Switch
          mb={2}
          ml={6}
          colorScheme="gray"
          isChecked={twoFactor}
          onChange={handleToggleAuth}
        >
          {twoFactor ? "2FA enabled" : "2FA disabled"}
        </Switch>
      </FormControl>
      <Divider my={5} />
      <Flex mr={4}>
        <Spacer />
        <RedButton text="취소하기" mr={2} />
        <BaseButton
          text="저장하기"
          isLoading={isSubmitting}
          type="submit"
          onClick={handleSubmit(onSubmit)}
        />
      </Flex>
    </Flex>
  );
};

export default Edit;
