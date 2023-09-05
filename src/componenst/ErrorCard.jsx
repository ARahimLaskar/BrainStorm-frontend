import React from "react";
import { Box, useColorMode, useColorModeValue } from "@chakra-ui/react";
import styles from "./ErrorCard.module.css";
import img from "../assets/404-img.gif";
export const ErrorCard = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      className={styles.errorDiv}
      bg={useColorModeValue("gray.100", "gray.900")}
    >
      <img src={img} />
    </Box>
  );
};
