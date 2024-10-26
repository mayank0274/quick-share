import { Box } from "@chakra-ui/react";
import React, { MutableRefObject } from "react";

type Props = {
  progressRef: MutableRefObject<HTMLDivElement | null>;
};

function ProgressBar({ progressRef }: Props) {
  return (
    <Box
      className="progress"
      height={"50px"}
      border={"1px solid #fff"}
      padding={"12px 10px"}
      boxShadow={"0 0 10px #aaa"}
      width={{ base: "100%", sm: "100%", md: "40%", lg: "40%" }}
      mx={"auto"}
    >
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
    </Box>
  );
}

export default ProgressBar;
