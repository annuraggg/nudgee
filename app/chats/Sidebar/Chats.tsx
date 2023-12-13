"use client";

import { Box, Text } from "@chakra-ui/react";
import { Chat, User } from "@types";
import ChatLayout from "./Chat";

const ChatsLayout = ({
  pinnedChats,
  chats,
  user,
}: {
  pinnedChats: Chat[];
  chats: Chat[];
  user: User;
}) => {
  return (
    <Box
      className="chats"
      width="25vw"
      alignSelf="flex-start"
      overflowY="auto"
      height="69vh"
      mt="10px"
    >
      <Box p="5px">
        {pinnedChats?.length > 0 ? (
          <Text className="text-left text-xs" ml="15px">
            Pinned Messages
          </Text>
        ) : (
          ""
        )}
        {pinnedChats?.map(
          (chat) =>
            user && <ChatLayout chat={chat} user={user} key={chat?.id} />
        )}
        <Text className="text-left text-xs mt-5" ml="15px" mb="10px">
          Messages
        </Text>
        {chats?.map(
          (chat) =>
            user && <ChatLayout chat={chat} user={user} key={chat?.id} />
        )}
      </Box>
    </Box>
  );
};

export default ChatsLayout;
