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
  Image,
  Spacer,
  Flex,
} from "@chakra-ui/react";
import BaseButton from "@/ui/Button/Button";
import { getTokenClient, getUserData } from "../user/components/UserDetail";

const Edit = () => {
  const userData = getUserData();
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  async function onSubmit(data: FormData) {
    setUploading(true);
    const formData = new FormData();
    if (!selectedFile) {
      return;
    }
    formData.append("file", selectedFile);
    console.log(formData.get("file"));
    formData.append("filename", selectedFile.name);
    const res = await fetch("http://127.0.0.1:3001/user/upload", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${getTokenClient()}`,
      },
      body: formData,
    });
    console.log(res);
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
          <Divider m="20px 0px" />
          <FormControl>
            <FormLabel mb="10px" htmlFor="name">
              프로필 이미지 변경하기
            </FormLabel>
            <Input
              type="file"
              onChange={({ target }) => {
                if (target.files) {
                  const file = target.files[0];
                  setSelectedFile(file);
                  setSelectedImage(URL.createObjectURL(file));
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
            </Flex>
          </FormControl>
          <Divider m="20px 0px" />
          <Flex>
            <Spacer />
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
