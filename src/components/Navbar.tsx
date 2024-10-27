"use client";

import GithubIcon from "@/icons/GithubIcon";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <Box
        px={4}
        width={{ base: "100%", sm: "100%", md: "70%", lg: "70%" }}
        margin={"auto"}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Link href={"/"}>
            <Box
              fontSize={"30px"}
              fontWeight={"bold"}
              fontStyle={"italic"}
              textAlign={"center"}
            >
              Quick
              <Text as={"span"} color={"orange.400"}>
                Share
              </Text>
            </Box>
          </Link>

          <Link
            href={"https://github.com/mayank0274/quick-share"}
            target="_blank"
          >
            <Button colorScheme="gray">
              Check out on Github &nbsp;
              <GithubIcon height="18px" width="18px" />
            </Button>
          </Link>
        </Flex>
      </Box>
    </>
  );
}
