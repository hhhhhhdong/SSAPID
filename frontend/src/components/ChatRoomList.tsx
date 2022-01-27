import React, { useState } from "react";
import { makeChatRoom, makeUser } from "service/function";
import Button from "./common/Button";

function ChatRoomList() {
  const [isEmpty, setEmpty] = useState(false);
  const userNickname = sessionStorage.getItem("userNickname");
  const accessToken = sessionStorage.getItem("accessToken");
  const making = async () => {
    try {
      await makeUser({
        accessToken,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const makingRoom = async () => {
    try {
      await makeChatRoom({
        timestamp: Date.now(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  // chatKey: data.chatKey,
  //   chatData: {
  //     userNickname: data.userNickname,
  //     message: data.message,
  //     timeStamp: data.timeStamp,
  //   },
  return (
    <div>
      <Button
        buttonType="button"
        Disabled={isEmpty}
        text="방생성"
        handleClick={makingRoom}
      />
      <Button
        buttonType="button"
        Disabled={isEmpty}
        text="유저생성"
        handleClick={making}
      />
    </div>
  );
}

export default ChatRoomList;
