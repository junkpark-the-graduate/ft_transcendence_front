"use client";

import BaseBox from "@/ui/Box/Box";
import BaseButton from "@/ui/Button/Button";
import BaseInput from "@/ui/Input/Input";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

export default function Test() {
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();

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

  return (
    <BaseBox>
      <FormControl>
        <FormLabel>이미지 변경하기</FormLabel>
        <Box bg="#191919" w={300} p={30} my={5}>
          <Input
            type="file"
            hidden
            onChange={({ target }) => {
              if (target.files) {
                const file = target.files[0];
                setSelectedImage(URL.createObjectURL(file));
                setSelectedFile(file);
              }
            }}
          />
          <div>
            {selectedImage ? (
              <img src={selectedImage} alt="" />
            ) : (
              <span>select image</span>
            )}
          </div>
        </Box>
      </FormControl>
      <BaseButton
        text={uploading ? "uploading..." : "upload"}
        disabled={uploading}
        type="submit"
        onClick={handleUpload}
      />
    </BaseBox>
  );
}
