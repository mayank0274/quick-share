"use client";

import {
  Box,
  Input,
  Text,
  Switch,
  PinInput,
  PinInputField,
  HStack,
  Button,
  useToast,
  InputGroup,
  InputRightElement,
  useClipboard,
  Divider,
  AbsoluteCenter,
  Link,
} from "@chakra-ui/react";
import React, { useState } from "react";
import FileUploadSuccessIcon from "@/icons/FileUploadSuccessIcon";
import { FileContext, useAppContext } from "@/context/contextProvider";
import EmailIcon from "@/icons/EmailIcon";
import WhatsappIcon from "@/icons/WhatsappIcon";
import axios from "axios";
import ShareIcon from "@/icons/ShareIcon";

export default function GenerateLink() {
  const [passwordConfig, setPasswordConfig] = useState({
    passwordEnabled: false,
    passwordValue: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");

  const [email, setEmail] = useState("");
  const toast = useToast();
  const { fileId } = useAppContext() as FileContext;
  const { onCopy, value, setValue, hasCopied } = useClipboard(downloadUrl);

  // create file link
  const saveFileEntry = async () => {
    const { passwordEnabled, passwordValue } = passwordConfig;
    const emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm;
    const isValidEmail = emailRegex.test(email);

    if (isValidEmail) {
      toast({
        status: "error",
        description: "email is not valid",
        duration: 1200,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (passwordEnabled && passwordValue === "") {
      toast({
        status: "error",
        description: "either enter password or disbale password protection",
        duration: 1200,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (fileId === "") {
      toast({
        status: "error",
        description: "file is required",
        duration: 1200,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    // create record in databse
    try {
      setIsLoading(true);
      const reqBody = {
        fileId,
        isPasswordEnabled: passwordConfig.passwordEnabled,
        password: passwordConfig.passwordValue,
        uploadedBy: email,
      };

      const res = await axios({
        url: "/api/generate-link",
        method: "POST",
        data: JSON.stringify(reqBody),
        headers: {
          "Content-type": "application/json",
        },
      });

      const uploadedFileDetails = await res.data;

      const url = `http://localhost:3000/download-file/${uploadedFileDetails.fileId}`;
      setDownloadUrl(url);
    } catch (error: any) {
      const errMsg = error.response.data.message;
      toast({
        status: "error",
        description: errMsg || "something went wrong while genarting link",
        isClosable: true,
        position: "bottom",
        duration: 1200,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // share url
  const shareUrl = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Download file",
          url: downloadUrl,
        })
        .then(() => {})
        .catch();
    }
  };

  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      gap={"20px"}
      width={"40%"}
      margin={"auto"}
      height={"90%"}
      alignItems={"center"}
      my={"50px"}
    >
      <Box
        padding={"20px"}
        width={"100%"}
        display={"flex"}
        flexDir={"column"}
        gap={"20px"}
        border={"1px dashed gray"}
        borderRadius={"10px"}
      >
        <Box display={"flex"} alignItems={"center"} gap={"10px"}>
          <FileUploadSuccessIcon height="40px" width="40px" />
          <Text fontSize={"20px"}>File Uploaded successfully</Text>
        </Box>

        <Text fontWeight={"500"}>
          Complete following steps in order to generate download link
        </Text>

        <Box display={"flex"} flexDir={"column"} gap={"8px"}>
          <Text>Enter Email</Text>
          <Input
            type="text"
            placeholder="enter email"
            variant={"filled"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Text color={"gray.500"} fontSize={"12px"}>
            Your email will not publicly shown,
          </Text>
        </Box>

        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text>
            Password Protect Download{" "}
            <Text
              as={"span"}
              display={"block"}
              color={"gray.500"}
              fontSize={"12px"}
            >
              User will be prompted to enter password in order to download file
            </Text>
          </Text>

          <Switch
            size="lg"
            sx={{
              ".chakra-switch__track[data-checked]:not([data-theme])": {
                backgroundColor: "orange",
              },
            }}
            onChange={(e) => {
              setPasswordConfig({
                ...passwordConfig,
                passwordEnabled: e.target.checked,
              });
            }}
          />
        </Box>

        {passwordConfig.passwordEnabled && (
          <Box display={"flex"} flexDir={"column"} gap={"8px"}>
            <Text>Enter pin</Text>
            <HStack spacing={7}>
              <PinInput
                otp
                onChange={(val) => {
                  if (val.length === 6) {
                    setPasswordConfig({
                      ...passwordConfig,
                      passwordValue: val,
                    });

                    console.log(passwordConfig);
                  }
                }}
                size={"md"}
                mask={true}
              >
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
          </Box>
        )}

        <Box width={"100%"}>
          <Button
            background={"orange"}
            color={"#fff"}
            width={"100%"}
            fontSize={"18px"}
            _hover={{
              background: "gray",
            }}
            onClick={saveFileEntry}
            isLoading={isLoading}
            isDisabled={downloadUrl != ""}
          >
            Generate link
          </Button>
        </Box>
      </Box>

      {downloadUrl && (
        <Box
          padding={"20px"}
          width={"100%"}
          display={"flex"}
          flexDir={"column"}
          gap={"20px"}
          border={"1px dashed gray"}
          borderRadius={"10px"}
        >
          <Text fontWeight={"500"}>
            <Text as={"span"} color={"green.500"}>
              Download link generated successfully!!
            </Text>{" "}
            Copy or share with your frineds
          </Text>
          <InputGroup borderRadius={"8px"} background={"#E2E8F0"}>
            <Input
              width={"90%"}
              as="input"
              type={"text"}
              id="password"
              name="password"
              border={"none"}
              _focus={{ border: "none", outline: "none" }}
              pointerEvents={"none"}
              textOverflow={"ellipsis"}
              value={downloadUrl}
              onChange={() => {
                return;
              }}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={onCopy}>
                {hasCopied ? "copied!" : "copy"}
              </Button>
            </InputRightElement>
          </InputGroup>

          <Box>
            <Box position="relative" padding="5">
              <Divider />
              <AbsoluteCenter bg="white" px="4">
                or , share with
              </AbsoluteCenter>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"center"}
              flexWrap={"wrap"}
              gap={"10px"}
            >
              <Link
                href={`mailto:`}
                bg={"gray.300"}
                padding={"9px 10px"}
                borderRadius={"5px"}
              >
                <EmailIcon height="18px" width="18px" />
              </Link>
              <Link
                href={`whatsapp://send?text=${downloadUrl}`}
                bg={"gray.300"}
                padding={"7px 10px"}
                borderRadius={"5px"}
              >
                <WhatsappIcon height="22px" width="22px" />
              </Link>

              <Button
                bg={"gray.300"}
                padding={"7px 10px"}
                borderRadius={"5px"}
                onClick={shareUrl}
              >
                <ShareIcon height="18px" width="20px" />
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
