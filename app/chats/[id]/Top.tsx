import React from "react";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faPhone,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import "./Chat.css";

const Top = () => {
  return (
    <Flex
      className="top bg-neutral ChatMain"
      justifyContent="space-between"
      p="15px 25px"
      borderTopRadius="13px"
    >
      <Flex>
        <Avatar
          src="https://avatars.githubusercontent.com/u/81866624?v=4"
          size="md"
        />
        <Box ml="20px">
          <Text>Anurag Sawant</Text>
          <Text fontSize="14px" textAlign="start" color="green.500">
            Online
          </Text>
        </Box>
      </Flex>
      <Flex gap="5px" align="center">
        <Flex className="hover" align="center" justify="center">
          <Box>
            <FontAwesomeIcon icon={faPhone} style={{ width: "19px" }} />
          </Box>
        </Flex>
        <Flex className="hover" align="center" justify="center">
          <Box>
            <FontAwesomeIcon icon={faVideo} style={{ width: "21px" }} />
          </Box>
        </Flex>
        <Flex className="hover" align="center" justify="center">
          <Box>
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              style={{ width: "5px" }}
            />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Top;
