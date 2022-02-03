import React from "react";
import Message from "./Message";
import MessageHeader from "./MessageHeader";
import MessageForm from "./MessageForm";

function Main() {
  return (
    <div style={{ padding: "2rem 2rem 0 2rem" }}>
      <MessageHeader />
      <div
        style={{
          width: "100%",
          height: "450px",
          border: ".2rem solid #ececec",
          borderRadius: "4px",
          padding: "1rem",
          marginBottom: "1rem",
          overflowY: "auto",
        }}
      />
      <MessageForm />
    </div>
  );
}

export default Main;
