import React from "react";
import styles from "./Footer.module.css";
import { Box, useColorModeValue, useColorMode } from "@chakra-ui/react";
export const Footer = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box id={styles.footerDiv} bg={useColorModeValue("gray.100", "gray.900")}>
      <p>SPACEX © 2023</p>
      <p>PRIVACY POLICY</p>
      <p>SUPPLIERS</p>
    </Box>
  );
};
