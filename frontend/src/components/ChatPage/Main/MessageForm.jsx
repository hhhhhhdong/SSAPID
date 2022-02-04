import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "components/common/Button";
import { makeMessage } from "service/function";

function MessageForm() {
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);
  const room = useSelector((state) => state.userReducer.chatRoomString);

  const handleClick = async () => {
    try {
      await makeMessage(message, room);
      setMessage("");
      setErrors([]);
    } catch (error) {
      setErrors((pre) => pre.concat(error.message));
    }
  };

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
          placeholder="Send the message"
          style={{ width: "100%", height: "40px", marginBottom: "2rem" }}
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
