// import { sendChat } from "service/function";
import React, { useState } from "react";
import Button from "./common/Button";
import Input from "./common/Input";

function ChatRoom() {
  const [isEmpty, setEmpty] = useState(true);
  const [chatText, setChat] = useState({ text: "" });
  const { text } = chatText;
  const state = sessionStorage.getItem("userNickname");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value !== "") {
      setEmpty(false);
    }
    setChat({
      ...chatText,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="chat-container">
      <div className="chat-top">헤더</div>
      <div className="chat-middle">
        <li className="chat-bubble send">
          <p>하이</p>
          <span>13:30pm</span>
        </li>

        <li className="chat-bubble receive">
          <p>방가</p>
          <span>13:31</span>
        </li>
        <div className="chat-bottom">
          <form onSubmit={handleSubmit}>
            <Input
              name="text"
              value={text}
              onChange={onChange}
              width={1500}
              placeHolder="입력해주세요"
            />
            <Button buttonType="submit" Disabled={isEmpty} text="보내기" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
