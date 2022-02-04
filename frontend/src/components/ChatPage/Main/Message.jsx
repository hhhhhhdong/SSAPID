import React from "react";
import { IoMdFunnel } from "react-icons/io";

function Message({ message }) {
  const timestamp = message.time;
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  let tmp;
  if (hours < 12) {
    tmp = `오전${hours}: ${minutes}`;
  } else {
    if (hours === 12) {
      tmp = `오후${hours}: ${minutes}`;
    }
    tmp = `오후${hours - 12}: ${minutes}`;
  }

  const isMessageMine = (message) => {
    const myId = sessionStorage.getItem("userNickname");

    return message.id === myId;
  };

  return (
    <div style={{ marginBottom: "3px", display: "flex" }}>
      <div
        style={{
          backgroundColor: isMessageMine(message) && "#3498db",
        }}
      >
        <h6>
          {message.id}{" "}
          <span style={{ fontSize: "10px", color: "gray" }}>{tmp}</span>
        </h6>
        <p>{message.contents}</p>
      </div>
    </div>
  );
}

export default Message;
