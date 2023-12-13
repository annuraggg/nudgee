"use client";
import React, { useEffect, useRef } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  VisuallyHidden,
} from "@chakra-ui/react";

const ChatContextMenu = ({ onClose }: { onClose: () => void }) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    btnRef.current ? btnRef.current.click() : null;
  }, []);

  return (
    <Menu onClose={onClose}>
      <MenuButton as={VisuallyHidden} ref={btnRef}></MenuButton>
      <MenuList mt="-10px" border="none" onContextMenu={(e) => e.preventDefault()}>
        <MenuItem _hover={{ backgroundColor: "#181E25" }}>Download</MenuItem>
        <MenuItem _hover={{ backgroundColor: "#181E25" }}>
          Create a Copy
        </MenuItem>
        <MenuItem _hover={{ backgroundColor: "#181E25" }}>
          Mark as Draft
        </MenuItem>
        <MenuItem _hover={{ backgroundColor: "#181E25" }}>Delete</MenuItem>
        <MenuItem _hover={{ backgroundColor: "#181E25" }}>
          Attend a Workshop
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ChatContextMenu;
