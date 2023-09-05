import React, { useState } from "react";
import Login from "../componenst/Login";
import {
  Button,
  ButtonGroup,
  Container,
  Divider,
  Flex,
  Box,
  Center,
} from "@chakra-ui/react";
import Signup from "../componenst/Signup";
import img from "../assets/wallpaper.webp";

export default function Login_SignupPage() {
  const [activeButton, setActiveButton] = useState(1);

  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };
  return (
    <div
      style={{
        width: " 100%",
        display: "flex",
        height: "80vh",
        justifyContent: "Center",
        alignItems: "center",
        margin: "2rem 0",
      }}
    >
      <Container
        borderRadius="1rem"
        p="20px"
        boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
      >
        <Flex>
          <ButtonGroup>
            <Button
              colorScheme={activeButton === "login" ? "blue" : "gray"}
              variant={activeButton === "login" ? "solid" : "outline"}
              onClick={() => handleButtonClick("login")}
            >
              Login
            </Button>
            <Button
              colorScheme={activeButton === "signup" ? "blue" : "gray"}
              variant={activeButton === "signup" ? "solid" : "outline"}
              onClick={() => handleButtonClick("signup")}
            >
              Signup
            </Button>
          </ButtonGroup>
        </Flex>
        <Divider margin="10px 0 0 0" />
        {activeButton === "login" ? <Login /> : <Signup />}
      </Container>
      {/* <img
        style={{
          width: "100%",
          height: "90vh",
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: "0",
          objectFit: "cover",
        }}
        src={img}
      /> */}
    </div>
  );
}
