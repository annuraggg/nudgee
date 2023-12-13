"use client";
import React, { useEffect } from "react";
import SidebarMain from "./Sidebar/Main";
import { Flex } from "@chakra-ui/react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import app from "@/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { Chat, User, Contact } from "@types";
import { useRouter } from "next/navigation";

const Layout = ({
  children,
}: {
  params: { slug: string[] };
  children: any;
}) => {
  const [chats, setChats] = React.useState<Chat[]>([]);
  const [pinnedChats, setPinnedChats] = React.useState<Chat[]>([]);
  const [user, setUser] = React.useState<User>();
  const [contacts, setContacts] = React.useState<Contact[]>([]);
  const [loadFlag, setLoadFlag] = React.useState<boolean>(false);
  const router = useRouter();

  const auth = getAuth(app);
  const fb = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user1) => {
      if (user1) {
        const userData = await getDoc(doc(collection(fb, "users"), user1?.uid));
        setUser(userData?.data() as User);

        const chatsData = await getDocs(
          query(
            collection(fb, "chats"),
            where("user1", "==", user1?.uid) || where("user2", "==", user1?.uid)
          )
        );

        chatsData?.forEach(async (chat) => {
          const receiver =
            chat?.data()?.user1 === user1?.uid
              ? chat?.data()?.user2
              : chat?.data()?.user1;
          const receiverData = await getDoc(
            doc(collection(fb, "users"), receiver)
          );
          const chatData = chat.data() as Chat;
          chatData.receiver = receiverData?.data() as User;

          if (user?.pinnedChats?.includes(chat?.id)) {
            setPinnedChats((prev: Chat[]) => [...prev, chatData as Chat]);
          } else {
            setChats((prev: Chat[]) => [...prev, chatData as Chat]);
          }
        });

        const phoneCache = doc(fb, "cache", "phone");
        const phoneCont = await getDoc(phoneCache);

        if (phoneCont.exists() && userData?.exists()) {
          const filteredContacts = userData
            ?.data()
            ?.contacts?.filter((number: string) =>
              phoneCont.data().number.includes(number)
            );

          if (filteredContacts) {
            for (const number of filteredContacts) {
              const query2 = query(
                collection(fb, "users"),
                where("phone", "==", number)
              );

              const querySnapshot = await getDocs(query2);

              querySnapshot.forEach((doc) => {
                setContacts((prev: Contact[]): Contact[] => [
                  ...prev,
                  doc.data() as Contact,
                ]);
              });
            }
          }
          setLoadFlag(true);
        }
      } else {
        const { push } = router;
        push("/auth");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth, fb, router, user?.pinnedChats]); // Get Sidebar Chats

  return (
    <Flex p="5px 20px" gap="20px" borderRadius="20px">
      <SidebarMain
        chats={chats}
        pinnedChats={pinnedChats}
        user={user || ({} as User)}
        contacts={contacts}
        loadFlag={loadFlag}
      />
      {children}
    </Flex>
  );
};

export default Layout;
