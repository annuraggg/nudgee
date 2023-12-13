import React, { useState } from "react";
import { Flex, Text, Avatar } from "@chakra-ui/react";
import { IoCheckmarkDone, IoCheckmark } from "react-icons/io5";
import { Chat, User } from "@types";
import { Timestamp } from "firebase/firestore";
import ChatContextMenu from "./ChatContextMenu";
import { useRouter } from "next/navigation";

const ChatBox = ({ chat, user }: { chat: Chat; user: User }) => {
  const { push } = useRouter();
  function convertFirebaseTimestamp(firebaseTimestamp: Timestamp) {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const currentTimestamp = new Date().getTime();
    const timestamp = firebaseTimestamp.toMillis();

    const timeDifference = currentTimestamp - timestamp;

    if (timeDifference < millisecondsPerDay) {
      // If Date is last 24 hours
      const date = new Date(timestamp);
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    } else if (timeDifference < 365 * millisecondsPerDay) {
      // If Date is more than 24 hours but within the past 365 days
      const date = new Date(timestamp);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      return `${day}/${month}`;
    } else {
      // If Year in Date is more than past 365 Days
      const date = new Date(timestamp);
      const year = date.getFullYear();
      return `${year}`;
    }
  }

  const [isContextMenuVisible, setContextMenuVisible] = useState(false);

  const handleContextMenu = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setContextMenuVisible(true);
  };

  const closeContextMenu = () => {
    setContextMenuVisible(false);
  };

  const openChat = () => {
    console.log("CHAT OPENED " + chat?.id);
    push(`/chats/${chat?.id}`);
  };

  return (
    <>
      <Flex
        key={chat?.id}
        justifyContent="space-between"
        className={
          chat?.messages[chat?.messages?.length - 1]?.read ? "read" : ""
        }
        p="10px 15px"
        _hover={{ cursor: "pointer", backgroundColor: "#181E25" }}
        borderRadius="10px"
        onContextMenu={handleContextMenu}
        onClick={openChat}
      >
        <Flex>
          <Avatar src={chat?.receiver?.image} size="md" />
          <Flex direction="column" justifyContent="space-around" ml="15px">
            <Text className="text-left text-sm font-bold">
              {chat?.receiver?.fname} {chat?.receiver?.lname}
            </Text>
            <Text className="text-left text-xs">
              {chat?.messages[chat?.messages?.length - 1]?.message}
            </Text>
          </Flex>
        </Flex>
        <Flex direction="column" align="flex-end" justify="space-around">
          <Flex width="50px" gap="10px" justify="flex-end">
            <Text className="text-xs">
              {convertFirebaseTimestamp(
                chat?.messages[chat?.messages?.length - 1]?.timestamp
              )}
            </Text>
          </Flex>
          {chat?.messages[chat?.messages?.length - 1]?.sender === user?.id ? (
            <Flex justify="flex-end">
              {chat?.messages[chat?.messages?.length - 1]?.delivered ===
              true ? (
                <>
                  {chat?.messages[chat?.messages?.length - 1]?.read === true ? (
                    <IoCheckmarkDone style={{ color: "#0084ff" }} />
                  ) : (
                    <IoCheckmarkDone />
                  )}
                </>
              ) : (
                <IoCheckmark />
              )}
            </Flex>
          ) : (
            ""
          )}
        </Flex>
      </Flex>
      {isContextMenuVisible && <ChatContextMenu onClose={closeContextMenu} />}
    </>
  );
};

export default ChatBox;
