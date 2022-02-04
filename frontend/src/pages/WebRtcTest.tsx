import React from "react";
import axios from "api/axios";

function WebRtcTest() {
  const onClick = () => {
    axios
      .post("/api-sessions/get-token", { sessionNameParam: "sessionTest" })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <button type="button" onClick={onClick}>
        참여하기
      </button>
    </div>
  );
}

export default WebRtcTest;
