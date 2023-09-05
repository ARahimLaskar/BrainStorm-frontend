import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  Container,
  Input,
  Button,
  Divider,
  VStack,
  Heading,
} from "@chakra-ui/react";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../Redux/action";

export default function Signup() {
  const [signupInputValues, setSignupInputValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { isSignup, signUp_res } = useSelector((store) => {
    return store;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupInputValues({
      ...signupInputValues,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(addUser(signupInputValues));
    setSignupInputValues({
      name: "",
      email: "",
      password: "",
    });
  };

  useEffect(() => {
    if (signUp_res.message == "User registered successfully") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Signed up successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setIsLoading(false);
    }
    if (signUp_res.message == "User already exist") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "User's email already exist",
        showConfirmButton: false,
        timer: 2000,
      });
      setIsLoading(false);
    }
  }, [isSignup, signUp_res]);

  return (
    <>
      <Container>
        <Heading padding="20px" textAlign="center">
          Signup
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack>
            <Input
              type="text"
              id="name"
              name="name"
              value={signupInputValues.name}
              placeholder="Enter Name"
              onChange={handleInputChange}
              required
            />
            <Input
              type="email"
              id="email"
              name="email"
              value={signupInputValues.email}
              placeholder="Enter Email"
              onChange={handleInputChange}
              required
            />

            <Input
              type="password"
              id="password"
              name="password"
              value={signupInputValues.password}
              placeholder="Enter Password"
              onChange={handleInputChange}
              required
            />
            <br />
            <Button
              isLoading={isLoading}
              loadingText="Processing"
              w="100%"
              colorScheme="blue"
              type="submit"
            >
              Signup
            </Button>
          </VStack>
        </form>
      </Container>
    </>
  );
}
