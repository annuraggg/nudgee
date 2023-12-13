"use client";
import React, { useEffect } from "react";
import { Flex, Heading, useToast } from "@chakra-ui/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import app from "../../firebaseConfig";
import { useRouter } from "next/navigation";

type GoogleContact = {
  names: { displayName: string }[];
  phoneNumbers: { value: string }[];
};

const Import = () => {
  const [contacts, setContacts] = React.useState<string[]>([]);
  const [fetchFlag, setFetchFlag] = React.useState<boolean>(false);
  const [progress, setProgress] = React.useState<number>(0);
  const [updated, setUpdated] = React.useState<boolean>(false); // [2
  const toast = useToast();

  const progressRef = React.useRef<HTMLProgressElement>(null);
  const { push } = useRouter();

  useEffect(() => {
    setTimeout(() => {
      if (updated) {
        setProgress(100);

        setTimeout(() => {
          push("/chats");
        }, 1000);
        return;
      }

      if (fetchFlag) {
        if (progress < 80) {
          setProgress(progress + 1);
        }
        return;
      }

      if (progress < 30) {
        setProgress(progress + 1);
      }
    }, 20);
  }, [progress, fetchFlag, updated, push]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const authorizationCode = queryParams.get("code");

    if (!fetchFlag) {
      if (authorizationCode) {
        const tokenEndpoint = "https://oauth2.googleapis.com/token";
        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
        const clientSecret = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET;
        const redirectUri = "http://localhost:3000/import";

        fetch(tokenEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            client_id: clientId || "",
            client_secret: clientSecret || "",
            code: authorizationCode,
            grant_type: "authorization_code",
            redirect_uri: redirectUri,
          }),
        })
          .then(async (res) => await res.json())
          .then((data) => {
            const accessToken = data.access_token;
            fetch(
              "https://people.googleapis.com/v1/people/me/connections?personFields=names,phoneNumbers&pageSize=1000",
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            )
              .then(async (res) => res.json())
              .then((data) => {
                if (data.connections) {
                  const contacts: string[] = [];
                  data.connections.forEach((contact: GoogleContact) => {
                    if (contact.phoneNumbers) {
                      contact.phoneNumbers.forEach((number) => {
                        contacts.push(number.value);
                      });
                    }
                  });
                  setContacts(contacts);
                  setFetchFlag(true);
                }
              })
              .catch((err) => {
                console.log(err);
                toast({
                  title: "An error occurred.",
                  description: "Unable to import contacts.",
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
              });
          })
          .catch((err) => {
            console.log(err);
            toast({
              title: "An error occurred.",
              description: "Unable to import contacts.",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          });
      }
    }
  }, [fetchFlag, toast]);

  useEffect(() => {
    const importContacts = async () => {
      if (fetchFlag) {
        const auth = getAuth(app);

        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const db = getFirestore(app);
            const userRef = doc(db, "users", user.uid);

            try {
              const userDoc = await getDoc(userRef);
              const existingContacts = userDoc.data()?.contacts || [];

              const contactsToImport = contacts.filter((contact) => {
                if (!contact) return false;
                if (existingContacts.includes(contact)) return false;
                return true;
              });

              await setDoc(
                userRef,
                {
                  contacts: arrayUnion(...contactsToImport),
                },
                { merge: true }
              );
              setUpdated(true);
              toast({
                title: "Contacts Imported.",
                description: "Your contacts have been imported successfully.",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
            } catch (error: any) {
              console.error("Error importing contacts:", error.message);
              toast({
                title: "An error occurred.",
                description: "Unable to import contacts.",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            }
          }
        });
      }
    };

    importContacts();
  }, [contacts, fetchFlag, toast]);

  return (
    <Flex
      align="center"
      justify="center"
      height="90vh"
      direction="column"
      gap="40px"
    >
      <Heading className="font-alegreya">Importing Contacts...</Heading>
      <progress
        className="progress progress-info w-56"
        value={progress}
        max="100"
        ref={progressRef}
      ></progress>
    </Flex>
  );
};

export default Import;
