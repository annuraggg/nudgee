import { Timestamp } from "firebase/firestore";

export type Messages = {
  delivered?: boolean;
  deliveredOn?: string;
  message: string;
  read?: boolean;
  readOn?: string;
  sender: string;
  timestamp: Timestamp;
};

export type Chat = {
  id: string;
  user1: string;
  user2: string;
  messages: Messages[];
  initiatedOn: string;
  receiver?: User;
};

export type User = {
  id: string;
  fname: string;
  lname: string;
  contacts?: string[];
  pinnedChats?: string[];
  image?: string;
};

export type Contact = {
  fname: string;
  lname: string;
  phone: string;
};
