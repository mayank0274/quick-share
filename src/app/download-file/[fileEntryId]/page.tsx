"use client";

import { storage } from "@/models/client/config";
import { filesAttachmentBucket } from "@/models/name";
import {
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Box,
  useToast,
  Skeleton,
  AbsoluteCenter,
  PinInputField,
  HStack,
  PinInput,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

type Params = Promise<{ fileEntryId: string }>;

export default function DownloadFile({ params }: { params: Params }) {
  const [isLoading, setIsLoading] = useState(true);
  const [downloadFileConfig, setDownloadFileConfig] = useState({
    fileId: "",
    isPasswordEnabled: false,
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const toast = useToast();
  const { fileEntryId } = React.use(params);

  // get taget file id in case of passowrd not required otherwise ask for password
  async function prepareFileDownload() {
    try {
      setIsLoading(true);

      const res = await axios({
        url: `/api/get-download-link?fileEntryId=${fileEntryId}`,
        method: "GET",
      });

      const { isPasswordEnabled, fileId, success } = await res.data;

      setDownloadFileConfig({
        ...downloadFileConfig,
        isPasswordEnabled,
        fileId,
      });
    } catch (error: any) {
      if (error.status === 500) {
        setErrorMsg("Something went wromg please try again after some time");

        return;
      } else if (error.status === 422 || error.status === 404) {
        setErrorMsg(
          "Invalid download link or file file you are trying to download not exist"
        );
        return;
      }

      const errMsg = error.response.data.message;
      toast({
        status: "error",
        description: errMsg || "something went wrong while preparing download",
        isClosable: true,
        position: "bottom",
        duration: 1200,
      });
    } finally {
      setIsLoading(false);
    }
  }

  // download file
  async function downloadFile() {
    if (!downloadFileConfig.fileId) {
      return;
    }

    const file = storage.getFileDownload(
      filesAttachmentBucket,
      downloadFileConfig.fileId
    );

    const link = document.createElement("a");
    link.href = file;
    link.click();
  }

  // verify password
  async function verifyPassword() {
    try {
      setIsLoading(true);
      const { password } = downloadFileConfig;

      const res = await axios({
        url: "/api/verify-password",
        method: "POST",
        headers: {
          "Conternt-Type": "application/json",
        },
        data: JSON.stringify({ password, fileEntryId: fileEntryId }),
      });

      const { isPasswordEnabled, fileId, success } = await res.data;
      // console.log(res);

      setDownloadFileConfig({
        ...downloadFileConfig,
        isPasswordEnabled,
        fileId,
      });
    } catch (error: any) {
      const errMsg = error.response.data.message;
      toast({
        status: "error",
        description: errMsg || "something went wrong while preparing download",
        isClosable: true,
        position: "bottom",
        duration: 1200,
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    prepareFileDownload();
  }, []);

  return (
    <Container maxW={"7xl"}>
      {isLoading && (
        <Stack width={"80%"} margin={"20px auto"}>
          <Skeleton height="400px" borderRadius={"10px"} />
          <Skeleton height="200px" borderRadius={"10px"} />
        </Stack>
      )}

      {errorMsg != "" && (
        <Box
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          height={"90vh"}
        >
          <Text color={"red.400"} fontSize={"23px"}>
            {errorMsg}
          </Text>
        </Box>
      )}

      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        display={isLoading || errorMsg ? "none" : "block"}
      >
        {downloadFileConfig.fileId && (
          <Heading fontWeight={600} fontSize={"5xl"} lineHeight={"110%"}>
            Your file is ready to{" "}
            <Text as={"span"} color={"orange.400"}>
              download
            </Text>
          </Heading>
        )}

        {downloadFileConfig.isPasswordEnabled && (
          <Box
            display={"flex"}
            flexDir={"column"}
            gap={"20px"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Heading fontWeight={600} fontSize="4xl" lineHeight={"110%"}>
              Download for this file is password protected
            </Heading>
            <Text color={"gray.500"} maxW={"3xl"}>
              Enter pin in order to download this file
            </Text>
            <HStack spacing={7}>
              <PinInput
                otp
                onChange={(val) => {
                  if (val.length === 6) {
                    setDownloadFileConfig({
                      ...downloadFileConfig,
                      password: val,
                    });
                  }
                }}
                size={"lg"}
                mask={true}
              >
                <PinInputField border={"1px solid #000"} />
                <PinInputField border={"1px solid #000"} />
                <PinInputField border={"1px solid #000"} />
                <PinInputField border={"1px solid #000"} />
                <PinInputField border={"1px solid #000"} />
                <PinInputField border={"1px solid #000"} />
              </PinInput>
            </HStack>

            <Button colorScheme="orange" width={"30%"} onClick={verifyPassword}>
              Verify
            </Button>
          </Box>
        )}

        <Box
          w={"100%"}
          display="flex"
          flexDir={"column"}
          alignItems={"center"}
          gap={"10px"}
          my={"30px"}
        >
          {" "}
          <Button
            colorScheme={"orange"}
            bg={"orange.400"}
            _hover={{ bg: "orange.500" }}
            fontSize={"25px"}
            width={"30%"}
            height={"80px"}
            onClick={downloadFile}
            isDisabled={
              downloadFileConfig.isPasswordEnabled || !downloadFileConfig.fileId
            }
          >
            Click here to download
          </Button>
          <Text color={"gray.500"} fontSize={"13px"}>
            Files deleted from our servers after 24 hrs of uploading
          </Text>
        </Box>
      </Stack>
    </Container>
  );
}
