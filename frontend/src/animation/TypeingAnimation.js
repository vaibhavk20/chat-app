import React from "react";
import Lottie from "lottie-react";
import typingAnimation from "../animation/typing.json"; // Path to your Lottie animation JSON file
import { Box } from "@chakra-ui/react";

const TypingAnimation = () => {
  return (
    <Box w={"100%"} h={"100%"} maxH={50} maxW={70}>
      <Lottie animationData={typingAnimation} loop autoPlay />
    </Box>
  );
};

export default TypingAnimation;
