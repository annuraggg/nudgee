"use client";
import React, { useState, useRef, useEffect, SyntheticEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { Box, Input } from "@chakra-ui/react";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'


const EmojiPicker = () => {
  const [emoji, setEmoji] = useState<boolean>(false);
  const emojiRef = useRef<HTMLElement | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleOutsideClick = (event: MouseEvent) => {
    if (emojiRef.current && !emojiRef.current.contains(event.target as Node)) {
      setEmoji(false);
    }
  };

  useEffect(() => {
    if (emoji) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [emoji]);

  return (
    <>
      {emoji ? (
        <Box
          mt="-450px"
          position="absolute"
          ref={emojiRef as React.RefObject<HTMLDivElement>}
        >
          <Picker data={data} onEmojiSelect={console.log} />
          
        </Box>
      ) : null}
      <FontAwesomeIcon
        icon={faFaceSmile}
        style={{ width: "25px", cursor: "pointer" }}
        onClick={() => setEmoji(true)}
      />
      <Input
        placeholder="Type a message"
        ml="15px"
        variant="unstyled"
        style={{ width: "100%" }}
        value={message}
        onChange={(e: SyntheticEvent<HTMLInputElement>) => setMessage(e.currentTarget.value)}
      />
    </>
  );
};

export default EmojiPicker;
