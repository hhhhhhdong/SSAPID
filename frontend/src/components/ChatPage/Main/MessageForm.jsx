import React from "react";

function MessageForm() {
  const onChange = () => {
    return 1;
  };
  return (
    <div>
      <form>
        <input
          type="textarea"
          name="message"
          value="message"
          onChange={onChange}
          placeHolder="Send the message"
          style={{ width: "100%", height: "80px" }}
        />
      </form>
    </div>
  );
}

export default MessageForm;
