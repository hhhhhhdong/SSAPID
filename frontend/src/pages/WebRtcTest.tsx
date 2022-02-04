/* eslint-disable prefer-destructuring */
import React from "react";
import axios from "api/axios";

function WebRtcTest() {
  let token;

  const onClick = () => {
    axios
      .post("/api-sessions/get-token", { sessionName: "sessionTest" })
      .then(({ data }) => {
        console.log(data);
        token = data[0];
        console.warn(`Request of TOKEN gone WELL (TOKEN:${token})`);
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
