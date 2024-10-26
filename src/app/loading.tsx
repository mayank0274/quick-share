import { Box, Center, Skeleton, Spinner, Stack } from "@chakra-ui/react";
import React from "react";

type Props = {};

const loading = (props: Props) => {
  return (
    <Stack width={"50%"} margin={"auto"} my={"20px"}>
      <Skeleton height="400px" borderRadius={"10px"} />
      <Skeleton height="200px" borderRadius={"10px"} />
    </Stack>
  );
};

export default loading;
