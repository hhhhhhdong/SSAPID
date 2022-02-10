import React from "react";

function Message({ message }) {
  const timestamp = message.time;
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  let minute;
  if (minutes < 10) {
    minute = `0${minutes}`;
  } else {
    minute = minutes;
  }
  let tmp;
  if (hours < 12) {
    tmp = `오전${hours}: ${minute}`;
  } else if (hours === 12) {
    tmp = `오후 ${hours}: ${minute}`;
  } else {
    tmp = `오후 ${hours - 12}: ${minute}`;
  }

  const isMessageMine = (message) => {
    const myId = sessionStorage.getItem("email");
    return message.id === myId;
  };

  return (
    <div
      style={{
        marginBottom: "3px",
        display: "flex",
        flexDirection: !isMessageMine(message) ? "row" : "row-reverse",
      }}
    >
      <div
        style={{
          backgroundColor: !isMessageMine(message) ? "#7f8c8d" : "#f1c40f",
          borderRadius: "1em",
          marginBottom: "2em",
          fontSize: "1rem",
          maxWidth: "60%",
          margin: "0.5em",
        }}
      >
        <div
          style={{
            position: "relative",
            alignItems: "center",
            textAlign: "center",
            fontSize: "0.8em",
            padding: "1em",
            wordWrap: "break-word",
          }}
        >
          {message.contents}
        </div>
      </div>
      <span
        style={{
          fontSize: "0.8em",
          color: "#2d3436",
          margin: "0.4em",
          paddingTop: "2em",
        }}
      >
        {tmp}
      </span>
    </div>
  );
}

export default Message;
