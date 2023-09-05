import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useColorMode,
  useDisclosure,
  Image,
} from "@chakra-ui/react";

import { AiOutlineUserAdd } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import {
  MoonIcon,
  SunIcon,
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import logo from "../assets/spacex.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../Redux/action";
import App from "../App";

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const userName = localStorage.getItem("user_name");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isLogin } = useSelector((store) => {
    return store;
  });
  const onButtonClick = () => {
    navigate("/login_signup");
  };

  const handleLogout = () => {
    localStorage.removeItem("user_name");
    localStorage.removeItem("token");
    dispatch(logOut());
    navigate("/");
    window.location.reload();
  };
  useEffect(() => {
    <App />;
  }, [isLogin]);

  return (
    <Box>
      <Flex
        bg={useColorModeValue("gray.100", "gray.900")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Image
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            width={"10rem"}
            color={useColorModeValue("gray.800", "white")}
            src={logo}
            cursor={"pointer"}
            onClick={() => navigate("/")}
          ></Image>

          <Flex display={{ base: "none", md: "flex" }} ml={8}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          // flex={{ base: 1, md: 0 }}
          display={"flex"}
          alignItems={"center"}
          justify={"flex-end"}
          direction={"row"}
          // spacing={6}
        >
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
          {userName ? <Text>Hi! {userName}</Text> : ""}

          {userName ? (
            <Button
              colorScheme="blue"
              variant="outline"
              leftIcon={<CiLogout style={{ fontSize: "1.2rem" }} />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Button
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"blue.400"}
              _hover={{
                fontWeight: "bold",
              }}
              rightIcon={<AiOutlineUserAdd style={{ fontSize: "1.2rem" }} />}
              size={["sm", "sm"]}
              onClick={onButtonClick}
            >
              Sign Up
            </Button>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={3}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger display="flex">
              <Text
                as="a"
                padding="0px"
                href={navItem.href ?? "#"}
                fontSize={["10px", "12px", "14px", "18px"]}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Text>
            </PopoverTrigger>
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
          _hover={{
            fontWeight: "bold",
          }}
        >
          {label}
        </Text>
      </Box>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "FALCON9",
  },
  {
    label: "DRAGON",
  },
  {
    label: "STARSHIP",
    href: "#",
  },
  {
    label: "RIDESHARE",
    href: "#",
  },
  {
    label: "STARLINK",
    href: "#",
  },
];
