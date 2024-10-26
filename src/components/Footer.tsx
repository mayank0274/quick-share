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
      position={"fixed"}
      bottom={0}
      marginTop={"70px"}
      bgColor={"gray.100"}
      backdropFilter="blur(2px)"
    >
      <Box
        height={"100%"}
        w={{ base: "95%", sm: "95%", md: "70%", lg: "70%" }}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text>&copy; QuickShare</Text>
        <Box display={"flex"} gap={"10px"}>
          <Link href="/linkedin">
            <LinkedinIcon height="23px" width="23px" />
          </Link>

          <Link href={"https://github.com/mayank0274"}>
            <GithubIcon height="20px" width="20px" />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
