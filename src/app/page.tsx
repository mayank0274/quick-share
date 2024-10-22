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
import { storage, databases } from "@/models/client/config";
import { db, filesAttachmentBucket, filesCollection } from "@/models/name";
import { ID, UploadProgress } from "appwrite";
import { useRef, useState } from "react";
import "./style.css";

export default function Home() {
  const toast = useToast();
  const [isUploadingFile, setIsUploadingFile] = useState<boolean>(false);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const onDrop = async (acceptedFiles: any) => {
    if (acceptedFiles.length > 0) {
      // upload file
      setIsUploadingFile(true);
      try {
        const file = await storage.createFile(
          filesAttachmentBucket,
          ID.unique(),
          acceptedFiles[0],
          undefined,
          (uploadprogress: UploadProgress) => {
            if (progressRef.current) {
              progressRef.current.style.width = `${uploadprogress.progress}%`;
            }
          }
        );

        console.log(file);

        // create record in databse
        if (file.$id) {
          const uploadedFile = await databases.createDocument(
            db,
            filesCollection,
            ID.unique(),
            {
              file_id: file.$id,
              sender_email: "abc@mail.com",
            }
          );
        }
      } catch (error) {
        toast({
          status: "error",
          description: "something went wrong while uploading file",
          isClosable: true,
          position: "bottom",
          duration: 1200,
        });
      } finally {
        setIsUploadingFile(false);
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Container maxW={"7xl"} {...getRootProps()}>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <input {...getInputProps()} />
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
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          gap={"10px"}
        >
          {!isUploadingFile && (
            <>
              {" "}
              <Button
                colorScheme={"orange"}
                bg={"orange.400"}
                _hover={{ bg: "orange.500" }}
                fontSize={"30px"}
                width={"25%"}
                height={"80px"}
              >
                Select file
              </Button>
              <Text color={"gray.500"} maxW={"3xl"} textAlign={"center"}>
                or drop here!
              </Text>
            </>
          )}

          {isUploadingFile && (
            <div className="progress">
              <div className="bar" ref={progressRef}>
                <div className="progress-value"></div>
              </div>
              <div
                style={{
                  marginTop: "20px",
                }}
              >
                Uploading...
              </div>
            </div>
          )}
        </Box>
      </Stack>

      {isDragActive && (
        <Box
          background={"orange"}
          width={"90%"}
          minH={"100%"}
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
