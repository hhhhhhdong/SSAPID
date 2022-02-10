import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "components/common/Button";
import { makeMessage, makeRead } from "service/function";

function MessageForm() {
  // 메시지의 정보를 DB에 저장하는 로직
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);
  const room = useSelector((state) => state.userReducer.chatRoomString);

  const handleClick = async (e) => {
    try {
      e.preventDefault();
      if (message) {
        makeMessage(message, room);
        makeRead(room);
      }
      setMessage("");
      setErrors([]);
    } catch (error) {
      setErrors((pre) => pre.concat(error.message));
    }
  };
  // 스크롤을 맨 아래로 내리는 로직

  const onChange = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  return (
    <div>
      <form onSubmit={handleClick}>
        <input
          type="textarea"
          name="message"
          value={message}
          onChange={onChange}
          placeholder="  Send the message"
          style={{
            width: "100%",
            height: "40px",
            marginBottom: "2rem",
            borderRadius: "10px",
            border: "none",
          }}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            handleClick={handleClick}
            text="S E N D"
            Disabled={!message}
          />
        </div>
      </form>
    </div>
  );
}

export default MessageForm;
