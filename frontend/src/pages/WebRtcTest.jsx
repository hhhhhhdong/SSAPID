/* eslint-disable prefer-destructuring */
import React, { useState } from "react";
import axios from "api/axios";
import OpenViduSession from "openvidu-react";

function WebRtcTest() {
  const [myUserName, setMyUserName] = useState("");
  const [mySessionId, setMySessionId] = useState("");
  const [session, setSession] = useState(false);
  const [token, setToken] = useState("");

  const onChangeUserName = (e) => {
    setMyUserName(e.target.value);
  };
  const onChangeMySessionId = (e) => {
    setMySessionId(e.target.value);
  };

  const onClick = () => {
    console.log("asdf");
    axios
      .post("/session")
      .then(({ data }) => {
        console.log(data);
        setSession(true);
        setToken(data.token);
      })
      .catch((err) => {
        console.dir(err);
      });
  };

  return (
    <div>
      {!session ? (
        <div>
          <input type="text" value={myUserName} onChange={onChangeUserName} />
          <input
            type="text"
            value={mySessionId}
            onChange={onChangeMySessionId}
          />
          <button type="button" onClick={onClick}>
            참여하기
          </button>
        </div>
      ) : (
        <div>
          <OpenViduSession
            id="opv-session"
            sessionName={mySessionId}
            user={myUserName}
            token={token}
            // joinSession={() => {
            //   console.log("join session");
            // }}
            // leaveSession={() => {
            //   // setSession(false);
            // }}
            // error={() => {
            //   console.log("error");
            // }}
          />
        </div>
      )}
    </div>
  );
}

export default WebRtcTest;
