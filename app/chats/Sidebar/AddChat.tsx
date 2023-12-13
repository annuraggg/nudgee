"use client";
import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
  Input,
  InputGroup,
  InputLeftAddon,
  Flex,
  Table,
  Thead,
  Tr,
  Tbody,
  Td,
  Box,
  useToast,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import app from "@/firebaseConfig";
import { Contact } from "@types";

const AddChat = ({
  closeAddChat,
  contacts,
  loadFlag,
}: {
  closeAddChat: () => void;
  contacts: Contact[];
  loadFlag: boolean;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isContinueBtnDisabled, setIsContinueBtnDisabled] =
    React.useState<boolean>(true);
  const [phone, setPhone] = React.useState<string>("");
  const [tableLoading, setTableLoading] = React.useState<boolean>(true);
  const toast = useToast();
  const db = getFirestore(app);

  useEffect(() => {
    onOpen();
  });

  useEffect(() => {
    if (loadFlag) {
      setTableLoading(false);
    }
  }, [loadFlag]);

  const closeModal = () => {
    closeAddChat();
    onClose();
  };

  const importFromGoogle = async () => {
    const clientId =
      "229152958631-covs7u767u5uil7q4ju58oeigiu3ftb0.apps.googleusercontent.com";
    const redirectUri = "http://localhost:3000/import";
    const scope = "https://www.googleapis.com/auth/contacts.readonly";
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;
    window.location.href = url;
  };

  const updateInput = (e: any) => {
    setPhone(e.target.value);
    if (e.target.value.length === 10) {
      setIsContinueBtnDisabled(false);
    } else {
      setIsContinueBtnDisabled(true);
    }
  };

  const checkEnter = (e: any) => {
    if (e.key === "Enter") {
      if (phone.length === 10) {
        setIsContinueBtnDisabled(false);
      }
    }
  };

  const openChat = () => {
    closeModal();
  };

  const checkAccount = async () => {
    const query2 = query(
      collection(db, "users"),
      where("phone", "==", `+91${phone}`)
    );

    const querySnapshot = await getDocs(query2);

    if (querySnapshot.empty) {
      toast({
        title: "No User Found",
        description: "Please enter a valid number",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      closeModal();
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex align="center" justify="center" gap="20px">
              <Button className="btn btn-primary" onClick={importFromGoogle}>
                <FontAwesomeIcon icon={faGoogle} /> Import From Google
              </Button>
              <Text>Or</Text>
              <InputGroup>
                <InputLeftAddon height="50px">+91</InputLeftAddon>
                <Input
                  placeholder="Enter A Number to Continue"
                  height="50px"
                  onKeyDown={checkEnter}
                  onChange={updateInput}
                  value={phone}
                />
              </InputGroup>
              <Button
                className="btn btn-accent"
                isDisabled={isContinueBtnDisabled}
                onClick={checkAccount}
              >
                Continue
              </Button>
            </Flex>

            <Text mt="20px">Your Contacts on Nudgee </Text>
            <Box height="55vh" overflowY="auto">
              {!tableLoading ? (
                contacts.length > 0 ? (
                  <Table variant="stripped" mt="10px">
                    <Thead>
                      <Tr>
                        <Td>Name</Td>
                        <Td>Number</Td>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {contacts.map((data, index) => (
                        <Tr
                          _hover={{
                            backgroundColor: "#ffffff10",
                            cursor: "pointer",
                          }}
                          key={index}
                          onClick={openChat}
                        >
                          <Td>
                            {data?.fname} {data?.lname}
                          </Td>
                          <Td>{data?.phone}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                ) : (
                  <Flex height="100%" align="center" justify="center">
                    <Text>No Contacts Found</Text>
                  </Flex>
                )
              ) : (
                <Flex height="100%" align="center" justify="center">
                  <span className="loading loading-spinner loading-xs"></span>
                </Flex>
              )}
            </Box>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddChat;
