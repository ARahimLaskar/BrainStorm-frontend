import React, { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import {
  Container,
  Input,
  Button,
  Divider,
  VStack,
  Text,
  Heading,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { postUser } from "../Redux/action";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { login_res, isLogin } = useSelector((store) => {
    return store;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(postUser(inputValues));
    setIsLoading(true);
    setInputValues({
      email: "",
      password: "",
    });
  };

  useEffect(() => {
    if (login_res.msg == "no user found") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "No Registered User found, Please Register!",
        showConfirmButton: false,
        timer: 2000,
      });
      setIsLoading(false);
    }
    if (login_res.msg == "login successful") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      setIsLoading(false);
      localStorage.setItem("token", login_res.token);
      localStorage.setItem("user_name", login_res.user.name);
      navigate("/products");
    }

    if (localStorage.getItem("user_name")) {
      navigate("/products");
    }
  }, [isLogin, login_res]);

  return (
    <Container>
      <Heading padding="20px" textAlign="center">
        Login
      </Heading>
      <form>
        <VStack>
          <Input
            type="email"
            id="email"
            name="email"
            value={inputValues.email}
            placeholder="Enter Email"
            onChange={handleInputChange}
            required
          />

          <Input
            type="password"
            id="password"
            name="password"
            value={inputValues.password}
            placeholder="Enter Password"
            onChange={handleInputChange}
            required
          />
          <br />
          <Button
            onClick={handleSubmit}
            isLoading={isLoading}
            loadingText="Processing"
            w="100%"
            colorScheme="blue"
            type="submit"
          >
            Login
          </Button>
        </VStack>
      </form>
    </Container>
  );
}
