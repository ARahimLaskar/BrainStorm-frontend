import React, { useEffect, useState } from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Text,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Divider, Select } from "@chakra-ui/react";
import axios from "axios";
import { ItemsCard } from "../componenst/ItemsCard";
import styles from "./Products.module.css";
import { FcFilledFilter } from "react-icons/fc";
import { getData } from "../Redux/action";
import { useDispatch, useSelector } from "react-redux";
import { ErrorCard } from "../componenst/ErrorCard";

export const Products = () => {
  const [inputValue, setInputValue] = useState("");
  const [sendData, setSendData] = useState("");
  const [findActive, setFindActive] = useState("");
  const [findType, setFindType] = useState("");
  const [sortValue, setSortValue] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const dispatch = useDispatch();
  const { items, isLoading, isError } = useSelector((store) => {
    return store;
  });

  useEffect(() => {
    dispatch(getData(sendData, findActive, findType, sortValue));
  }, [sendData, findActive, findType, sortValue]);

  const handleKeyPress = (event) => {
    if (event.key == "Enter") {
      setSendData(inputValue);
    } else if (event.key == "Backspace") {
      setSendData("");
    }
  };

  const handleActiveSearch = () => {
    setFindActive("active");
    setSendData("");
    setInputValue("");
  };

  const handleType = (e) => {
    setFindType(e.target.value);
    setSendData("");
    setInputValue("");
  };

  const handleSort = (e) => {
    setSortValue(e.target.value);
    setSendData("");
    setInputValue("");
  };

  const handleClearFilter = () => {
    setSendData("");
    setFindActive("");
    setFindType("");
    setSortValue("");
  };

  return (
    <>
      <div className={styles.searchMenu}>
        <div id={styles.filterIcon}>
          <InputGroup>
            <InputLeftElement>
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              className={styles.searchLinks}
              type="tel"
              onChange={(e) => setInputValue(e.target.value.toUpperCase())}
              value={inputValue}
              placeholder="Search C101, C102..."
              onKeyDown={handleKeyPress}
            />
          </InputGroup>
          <FcFilledFilter
            size="30px"
            ref={btnRef}
            colorScheme="teal"
            onClick={onOpen}
          />
        </div>
        <div>
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
            size="xs"
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Filters</DrawerHeader>

              <DrawerBody style={{ overflow: "hidden" }}>
                <Text
                  className={styles.searchLinks}
                  fontWeight="400"
                  fontSize="xs"
                  padding={".8rem 0"}
                  onClick={handleActiveSearch}
                >
                  Find Active Capsules
                </Text>
                <Divider />
                <Select
                  className={styles.searchLinks}
                  variant="flushed"
                  fontSize="xs"
                  placeholder="Find by Type"
                  onChange={handleType}
                >
                  <option fontSize="xs" value="Dragon 1.1">
                    Dragon 1.1
                  </option>
                  <option fontSize="xs" value="Dragon 2.0">
                    Dragon 2.0
                  </option>
                </Select>

                <Select
                  className={styles.searchLinks}
                  variant="flushed"
                  fontSize="xs"
                  placeholder="Sort Capsule Serial"
                  onChange={handleSort}
                >
                  <option value="desc">High to Low</option>
                  <option value="asc">Low to High</option>
                </Select>
                <Text
                  className={styles.searchLinks}
                  fontWeight="400"
                  fontSize="xs"
                  color="red"
                  padding={".8rem 0"}
                  onClick={handleClearFilter}
                >
                  Clear All Filter
                </Text>
                <Divider />
              </DrawerBody>

              <DrawerFooter>
                <Button variant="outline" mr={3} onClick={onClose}>
                  Close
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      <div className={styles.landingContainer}>
        <div className={styles.leftDiv}>
          <Input
            onChange={(e) => setInputValue(e.target.value.toUpperCase())}
            value={inputValue}
            placeholder="Search C101, C102..."
            onKeyDown={handleKeyPress}
          />
          <Text
            className={styles.searchLinks}
            fontWeight="400"
            padding={".7rem 0"}
            onClick={handleActiveSearch}
          >
            Find Active Capsules
          </Text>
          <Divider />
          <Select
            className={styles.searchLinks}
            variant="flushed"
            placeholder="Find by Type"
            onChange={handleType}
          >
            <option value="Dragon 1.1">Dragon 1.1</option>
            <option value="Dragon 2.0">Dragon 2.0</option>
          </Select>

          <Select
            className={styles.searchLinks}
            variant="flushed"
            placeholder="Sort Capsule Serial"
            onChange={handleSort}
          >
            <option value="desc">High to Low</option>
            <option value="asc">Low to High</option>
          </Select>
          <Text
            className={styles.searchLinks}
            fontWeight="400"
            color="red"
            padding={".7rem 0"}
            onClick={handleClearFilter}
          >
            Clear All Filter
          </Text>
          <Divider />
        </div>
        <div className={styles.cardsContainer}>
          {items.length == 0 ? (
            <ErrorCard />
          ) : (
            items.map((e, i) => {
              return (
                <div key={i}>
                  {isLoading ? (
                    <Box
                      key={i + 1}
                      width="30%"
                      padding="6"
                      boxShadow="lg"
                      bg="white"
                    >
                      <SkeletonCircle margin="0 auto" size="10" />
                      <SkeletonText
                        mt="4"
                        noOfLines={4}
                        spacing="4"
                        skeletonHeight="2"
                      />
                    </Box>
                  ) : (
                    <ItemsCard key={i + 2} props={e} />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};
