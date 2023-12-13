"use client";
import React from "react";
import { Box, Flex, Text, Avatar, AvatarBadge } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Tabs from "./Tabs";
import ChatsSidebar from "./Chats";
import { RiChatNewLine } from "react-icons/ri";
import AddChat from "./AddChat";
import { Chat, Contact, User } from "@/@types/types";

const Main = ({chats, pinnedChats, contacts, loadFlag, user}: {chats: Chat[], pinnedChats: Chat[], contacts: Contact[], loadFlag: boolean, user: User}) => {
  const [addChatModal, setAddChatModal] = React.useState(false);
  const closeAddChat = () => {
    setAddChatModal(false);
  };

  return (
    <div className="card bg-neutral text-neutral-content">
      <div
        className="items-center text-center"
        style={{ height: "fit-content" }}
      >
        <Box className="top" width="25vw">
          <Flex width="25vw" p="20px 25px" justify="space-between">
            <Flex>
              <Avatar>
                <AvatarBadge
                  bg="green.500"
                  boxSize="17px"
                  borderColor="green.500"
                />
              </Avatar>
              <Box ml="20px">
                <Text
                  fontSize="16px"
                  fontWeight="600"
                  className="font-Comfortaa"
                >
                  {user?.fname} {user?.lname}
                </Text>
                <Text
                  fontSize="14px"
                  textAlign="start"
                  className="font-Comfortaa"
                >
                  Online
                </Text>
              </Box>
            </Flex>

            <Flex align="center" gap="5px">
              <Box
                cursor="pointer"
                p="10px"
                borderRadius="50%"
                transition=".2s"
                _hover={{ backgroundColor: "rgba(255, 255, 255, 0.126)" }}
                onClick={() => setAddChatModal(true)}
              >
                <RiChatNewLine />

                {addChatModal ? (
                  <AddChat
                    closeAddChat={closeAddChat}
                    contacts={contacts}
                    loadFlag={loadFlag}
                  />
                ) : null}
              </Box>
              <Box
                cursor="pointer"
                p="10px"
                borderRadius="50%"
                transition=".2s"
                _hover={{ backgroundColor: "rgba(255, 255, 255, 0.126)" }}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} className="w-5" />
              </Box>
            </Flex>
          </Flex>
          <Box p="0 25px">
            <Tabs />
          </Box>
        </Box>

        <ChatsSidebar
          pinnedChats={pinnedChats}
          chats={chats}
          user={user || ({} as User)}
        />
      </div>
    </div>
  );
};

export default Main;
