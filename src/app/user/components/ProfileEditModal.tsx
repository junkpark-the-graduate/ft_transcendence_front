import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
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
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import BaseButton from "@/ui/Button/Button";
import { getMyData } from "@/utils/user/getMyData";
import BaseHeading from "@/ui/Typo/Heading";
import BaseInput from "@/ui/Input/Input";
import FileInput from "@/ui/Input/FileInput";
import { uploadUserInfo } from "@/utils/edit/uploadUserInfo";
import { uploadUserImg } from "@/utils/edit/uploadUserImg";
import { checkDuplicateName } from "@/utils/edit/checkDuplicateName";
import { GoPencil } from "react-icons/go";

type FormData = {
  name: string;
  image: string;
  twoFactorEnabled: boolean;
};

export default function ProfileEditModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const userData = getMyData();
  const [inputName, setInputName] = useState("");
  const [isNameValid, setIsNameValid] = useState(0);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [twoFactor, setTwoFactor] = useState(userData?.twoFactorEnabled);
  const [isUploading, setIsUploading] = useState(false);
  const toast = useToast();
  const pathname = usePathname();

  const {
    handleSubmit,
    formState: { isSubmitting },
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

  async function onSubmit() {
    const newName = inputName || userData?.name || "";

    if (
      newName == userData?.name &&
      selectedImage == "" &&
      twoFactor == userData?.twoFactorEnabled
    ) {
      onClose();
      return;
    }

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

    uploadUserImg(selectedFile, formData, setIsUploading);
    uploadUserInfo(newName, twoFactor, setIsUploading);

    if (!isUploading) {
      if (pathname == "/user/profile") {
        window.location.reload();
      }
      onClose();
    }
  }

  return (
    <Box>
      <BaseButton
        my={1}
        w="full"
        size="sm"
        text="edit profile"
        leftIcon={<GoPencil />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          mt={20}
          p={4}
          border="#A0A0A3 3px solid"
          boxShadow={"7px 7px black"}
          borderRadius="0"
          bg="#29292D"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>
              <BaseHeading text="edit profile" />
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody
              mx={3}
              px={3}
              py={5}
              borderTop={"#A0A0A3 1px solid"}
              borderBottom={"#A0A0A3 1px solid"}
            >
              <FormControl>
                <FormLabel mb={3} htmlFor="name">
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
                <Divider my={4} />
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
                <Divider my={4} />
                <FormLabel mb={3} htmlFor="name">
                  {">"} 2FA 설정 변경하기
                </FormLabel>
                <Switch
                  mx="10px"
                  colorScheme="gray"
                  isChecked={twoFactor}
                  onChange={handleToggleAuth}
                >
                  {twoFactor ? "2FA enabled" : "2FA disabled"}
                </Switch>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Flex>
                <Spacer />
                <BaseButton
                  text="저장하기"
                  isLoading={isSubmitting}
                  type="submit"
                  onClick={() => {}}
                />
              </Flex>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}
