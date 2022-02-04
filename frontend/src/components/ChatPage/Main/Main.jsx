import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getDatabase,
  ref,
  child,
  DataSnapshot,
  onChildAdded,
} from "firebase/database";
import Message from "./Message";
import MessageHeader from "./MessageHeader";
import MessageForm from "./MessageForm";

function Main() {
  const [messages, setMessages] = useState([]);
  const [state] = useState({
    messagesRef: ref(getDatabase(), "messages"),
  });
  const room = useSelector((state) => state.userReducer.chatRoomString);

  const renderMessages = (messages) =>
    messages.length > 0 &&
    messages.map((message) => (
      <Message key={message.timestamp} message={message} />
    ));
  // 렌더링 될때마다 db에서 스키마 로딩
  useEffect(() => {
    if (room) {
      addMessageListeners(room);
    }
    return () => setMessages([]);
  }, []);
  // 데이터 스냅샷을 이용해서 DB에서 스키마를 가지고 조작
  function addMessageListeners(room) {
    const { messagesRef } = state;
    const messagesArray = [];

    onChildAdded(child(messagesRef, room[0]), (DataSnapshot) => {
      const messages = DataSnapshot.val();
      messagesArray.push(messages);
      setMessages([...messagesArray]);
    });
  }

  return (
    <div style={{ padding: "2rem 2rem 0 2rem" }}>
      <MessageHeader />
      <div
        style={{
          width: "100%",
          height: "40em",
          border: ".2rem solid #ececec",
          backgroundColor: "#74b9ff",
          borderRadius: "10px",
          marginBottom: "1rem",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {renderMessages(messages)}
      </div>

      <MessageForm />
    </div>
  );
}

export default Main;
