import React from "react";
import { IoIosChatboxes } from "react-icons/io";

function UserPanel() {
  const name = sessionStorage.getItem("userNickname");
  return (
    <div>
      {/* logo */}
      <h3 style={{ color: "white" }}>
        <IoIosChatboxes />
        {`${name} 님 반갑습니다.`}
      </h3>
    </div>
  );
}

export default UserPanel;
