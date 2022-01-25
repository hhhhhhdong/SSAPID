import { sendChat } from "service/function";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./common/Button";
import { nickStore } from "../redux/store";
import Input from "./common/Input";

function ChatRoom() {
  const state = nickStore.getState();
  const [isEmpty, setEmpty] = useState(true);
  const [chatText, setChat] = useState({ text: "" });
  const { text } = chatText;
  const navigate = useNavigate();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(state);
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
    try {
      await sendChat({
        message: text,
        timestamp: Date.now(),
        uid: state,
      });
    } catch (error) {
      console.log(error);
    }
    navigate("/");
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
