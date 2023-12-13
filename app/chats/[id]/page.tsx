"use client";
import React, { useEffect } from "react";
import Top from "./Top";
import Content from "./Content";
import Footer from "./Footer";

const Chat = ({ params }: { params: { id: string } }) => {
  useEffect(() => {
    console.log(params.id);
  }, [params.id]);

  return (
    <div
      className="card bg-base-200 text-neutral-content"
      style={{ width: "47vw" }}
    >
      <Top />
      <Content />
      <Footer />
    </div>
  );
};

export default Chat;
