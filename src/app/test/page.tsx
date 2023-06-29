"use client";

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
} from "@chakra-ui/react";
import { SubmitHandler } from "react-hook-form";
import BaseButton from "@/ui/Button/Button";

type FormData = {
  name: string;
};

export default function HookForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (values) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        // resolve();
      }, 3000);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Center>
        <Box bg="#29292D" w="500px" p="40px 60px" borderRadius={"15px"}>
          <FormControl
          // isInvalid={errors.name}
          >
            <FormLabel htmlFor="name">이름 변경하기</FormLabel>
            <Input
              id="name"
              placeholder="name"
              {...register("name", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
            <Divider m="10px 0px" />
            <FormLabel htmlFor="name">프로필 이미지 변경하기</FormLabel>
            <Image
              mx="10px"
              // borderRadius="full"
              boxSize="120px"
              src="https://bit.ly/dan-abramov"
              alt="Dan Abramov"
            />
            <Divider m="10px 0px" />
          </FormControl>
          <BaseButton
            text="저장하기"
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          />
        </Box>
      </Center>
    </form>
  );
}
