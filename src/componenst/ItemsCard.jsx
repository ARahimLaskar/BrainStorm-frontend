import React from "react";
import styles from "./ItemsCard.module.css";
import img from "../assets/rocket.gif";
import { Box, useColorMode, useColorModeValue } from "@chakra-ui/react";
export const ItemsCard = ({ props }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box className={styles.card} bg={useColorModeValue("gray.100", "gray.900")}>
      <div className={styles.imgContainer}>
        <img src={img} />
      </div>

      <div className={styles.cardDetails}>
        <p>
          capsule_serial : <span>{props.capsule_serial}</span>{" "}
        </p>
        <p>
          capsule_id : <span>{props.capsule_id}</span>{" "}
        </p>

        <p>
          status : <span>{props.status}</span>{" "}
        </p>
        <p>
          original_launch : <span>{props.original_launch}</span>
        </p>
        <p>
          original_launch_unix : <span>{props.original_launch_unix}</span>
        </p>

        <p>
          missions : <span>{props.missions.length}</span>
        </p>

        <p>
          landing : <span>{props.landings}</span>
        </p>
        <p>
          type : <span>{props.type}</span>
        </p>
        <p>
          details : <span>{props.details}</span>{" "}
        </p>
        <p>
          reuse_count : <span>{props.reuse_count}</span>{" "}
        </p>
      </div>
    </Box>
  );
};
