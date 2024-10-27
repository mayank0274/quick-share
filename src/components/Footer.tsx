import React from "react";
import { Text, Box } from "@chakra-ui/react";
import Link from "next/link";
import LinkedinIcon from "@/icons/LinkedinIcon";
import GithubIcon from "@/icons/GithubIcon";

export const Footer: React.FC = () => {
  return (
    <Box
      display={"flex"}
      w={"100%"}
      justifyContent={"center"}
      h={"50px"}
      alignItems={"center"}
      borderTop={"1px solid gray"}
      // mt={"20px"}
    >
      <Box
        height={"100%"}
        w={{ base: "95%", sm: "95%", md: "70%", lg: "70%" }}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text>&copy; QuickShare</Text>
        <Box display={"flex"} gap={"10px"} alignItems={"center"}>
          <Link href="https://linkedin.com/in/luck-sharma" target="_blank">
            <LinkedinIcon height="30px" width="30px" />
          </Link>

          <Link href={"https://github.com/mayank0274"} target="_blank">
            <GithubIcon height="23px" width="25px" />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
