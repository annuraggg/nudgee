"use client"
import { Flex } from "@chakra-ui/react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import EmojiPicker from "./EmojiPicker";

const Footer = () => {
  return (
    <Flex
      className="bg-neutral"
      height="10vh"
      borderBottomRadius="13px"
      align="center"
      padding="0 20px"
    >
      <Flex
        align="center"
        p="0 15px"
        className="bg-base-200"
        height="70%"
        width="80%"
        borderRadius="25px"
      >
        <EmojiPicker />
       
      </Flex>
      <Flex
        align="center"
        justify="center"
        border="1px"
        ml="15px"
        width="50px"
        height="50px"
        borderRadius="50%"
        cursor="pointer"
        _hover={{ backgroundColor: "#ffffff10" }}
        transition=".2s"
      >
        <FontAwesomeIcon
          icon={faPlus}
          style={{
            width: "20px",
          }}
        />
      </Flex>
      <Flex
        align="center"
        justify="center"
        border="1px"
        ml="15px"
        width="50px"
        height="50px"
        borderRadius="50%"
        className="bg-primary"
        cursor="pointer"
        transition=".2s"
        _hover={{ backgroundColor: "#7480FF99" }}
      >
        <FontAwesomeIcon
          icon={faPaperPlane}
          style={{ width: "20px", marginLeft: "-3px", color: "black" }}
        />
      </Flex>
    </Flex>
  );
};

export default Footer;
