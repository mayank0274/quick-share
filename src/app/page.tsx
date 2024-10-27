"use client";

import {
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { storage } from "@/models/client/config";
import { filesAttachmentBucket } from "@/models/name";
import { ID, UploadProgress } from "appwrite";
import { useRef, useState } from "react";
import "./style.css";
import { FileContext, useAppContext } from "@/context/contextProvider";
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";

export default function Home() {
  const toast = useToast();
  const [isUploadingFile, setIsUploadingFile] = useState({
    isUploading: false,
    uploadCompleted: false,
  });
  const progressRef = useRef<HTMLDivElement | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const { setFileId } = useAppContext() as FileContext;
  const router = useRouter();

  // upload file
  const onDrop = async (acceptedFiles: any) => {
    if (acceptedFiles.length > 0) {
      // upload file
      setIsUploadingFile({
        isUploading: true,
        uploadCompleted: false,
      });

      try {
        const file = await storage.createFile(
          filesAttachmentBucket,
          ID.unique(),
          acceptedFiles[0],
          undefined,
          (uploadProgress: UploadProgress) => {
            console.log(uploadProgress);
            if (progressRef.current) {
              progressRef.current.style.width = `${uploadProgress.progress}%`;
            }
          }
        );

        if (progressRef.current) {
          progressRef.current.style.width = "100%";
        }

        setFileId(file.$id);

        setIsUploadingFile({
          isUploading: false,
          uploadCompleted: true,
        });

        router.push("/generate-link");
      } catch (error) {
        toast({
          status: "error",
          description: "something went wrong while uploading file",
          isClosable: true,
          position: "bottom",
          duration: 1200,
        });

        setIsUploadingFile({
          isUploading: false,
          uploadCompleted: false,
        });
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Container
      maxW={"7xl"}
      {...getRootProps()}
      onClick={() => {
        return;
      }}
    >
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <input {...getInputProps()} ref={inputFileRef} />
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          File sharing{" "}
          <Text as={"span"} color={"orange.400"}>
            made easy
          </Text>
        </Heading>
        <Text color={"gray.500"} maxW={"3xl"}>
          Share files effortlessly, securely, and instantly. Our platform makes
          it easy to send large files to anyone, anywhere. No sign-up required.
          Start sharing today!
        </Text>

        <Box
          w={"100%"}
          display={
            isUploadingFile.isUploading || isUploadingFile.uploadCompleted
              ? "none"
              : "flex"
          }
          flexDir={"column"}
          alignItems={"center"}
          gap={"10px"}
        >
          {" "}
          <Button
            colorScheme={"orange"}
            bg={"orange.400"}
            _hover={{ bg: "orange.500" }}
            fontSize={"30px"}
            width={{ base: "80%", sm: "80%", md: "25%", lg: "25%" }}
            height={"80px"}
            onClick={() => {
              inputFileRef?.current?.click();
            }}
          >
            Select file
          </Button>
          <Text color={"gray.500"} maxW={"3xl"} textAlign={"center"}>
            or drop here!
          </Text>
        </Box>

        <Box
          width={"100%"}
          display={
            isUploadingFile.isUploading || isUploadingFile.uploadCompleted
              ? "block"
              : "none"
          }
        >
          <ProgressBar progressRef={progressRef} />
        </Box>
      </Stack>

      {isDragActive && (
        <Box
          background={"orange"}
          width={"90%"}
          minH={"80%"}
          position={"absolute"}
          top={20}
          left={20}
          border={"1px solid #fff"}
          padding={"10px"}
          borderRadius={10}
          opacity={"0.3"}
        ></Box>
      )}
    </Container>
  );
}
