/* eslint-disable prefer-destructuring */
import React, { useState } from "react";
import axios from "api/axios";
import OpvSession from "openvidu-react";

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
    axios
      .post("/session")
      .then(({ data }) => {
        console.log(data);
        setSession(true);
        setToken(data.token);
        console.log(data.token);
      })
      .catch((err) => {
        console.dir(err);
      });
  };

  return (
    <div>
      {session ? (
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
          <OpvSession
            id="opv-session"
            sessionName={mySessionId}
            user={myUserName}
            token="wss://localhost:4443?sessionId=ses_KZvWGWltdO&token=tok_O2HWn1vG1ZkNhedm"
          />
        </div>
      )}
    </div>
  );
}

export default WebRtcTest;
