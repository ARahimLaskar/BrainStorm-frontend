import React from "react";
import img from "../assets/wallpaper.webp";
import styles from "./Home.module.css";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/products");
  };

  return (
    <div className={styles.homeSection}>
      <div>
        <h2>THE STARS DON'T LOOK BIGGER, BUT THEY DO LOOK BRIGHTER.</h2>
        <Button
          id={styles.btn}
          rightIcon={<ArrowForwardIcon boxSize={5} />}
          colorScheme="#edf2f7"
          variant="outline"
          onClick={handleNavigate}
        >
          Get Started
        </Button>
      </div>

      <img id={styles.wallpaper} src={img} />
    </div>
  );
};
