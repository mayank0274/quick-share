"use client";

import { Box, Flex, Text } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

export default function Navbar() {
  return (
    <>
      <Box px={4} width={"70%"} margin={"auto"}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box fontSize={"30px"} fontWeight={"bold"}>
            Quick
            <Text as={"span"} color={"orange.400"}>
              Share
            </Text>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
