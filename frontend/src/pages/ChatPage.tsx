import React from "react";
import Side from "../components/ChatPage/Side/Side";
import Main from "../components/ChatPage/Main/Main";

function ChatPage() {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "300px" }}>
        <Side />
      </div>
      <div style={{ width: "100%" }}>
        <Main />
      </div>
    </div>
  );
}

export default ChatPage;
