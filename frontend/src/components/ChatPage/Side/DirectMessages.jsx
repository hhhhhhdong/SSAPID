import React, { useEffect, useState } from "react";
import { BiMessageAltDetail } from "react-icons/bi";
import {
  getDatabase,
  ref,
  DataSnapshot,
  onChildAdded,
} from "firebase/database";

function DirectMessages() {
  const [state, setState] = useState({
    usersRef: ref(getDatabase(), "users"),
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    addUsersListeners();
  }, []);

  // 데이터 스냅샷을 이용해서 DB에서 스키마를 들고와서 로그인 로그아웃 기능을 추가함
  function addUsersListeners() {
    const { usersRef } = state;
    const myName = sessionStorage.getItem("userNickname");
    const usersArray = [];
    onChildAdded(usersRef, (DataSnapshot) => {
      if (myName !== DataSnapshot.key) {
        // eslint-disable-next-line prefer-const
        let user = DataSnapshot.val();
        user.nickName = DataSnapshot.key;
        user.status = "offline";
        usersArray.push(user);
        setUsers([...usersArray]);
      }
    });
  }

  // 방 ID 생성
  const getChatRoomId = (userId) => {
    const myId = sessionStorage.getItem("userNickname");
    const currentUserId = myId;
    return userId > currentUserId
      ? `${userId}/${currentUserId}`
      : `${currentUserId}/${userId}`;
  };

  // 채팅 룸 변경
  const changeChatRoom = (user) => {
    const chatRoomId = getChatRoomId(user.userNickname);
    return chatRoomId;
  };

  // 닉네임 렌더링
  const renderDirectMessages = (users) =>
    users.length > 0 &&
    users.map((user) => (
      <li
        key={user.nickName}
        onClick={() => changeChatRoom(user)}
        aria-hidden="true"
      >
        {user.nickName}
      </li>
    ));

  return (
    <div>
      <span style={{ display: "flex", alignItems: "center" }}>
        <BiMessageAltDetail style={{ marginRight: "3px" }} /> Direct Message(1)
      </span>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {renderDirectMessages(users)}
      </ul>
    </div>
  );
}

export default DirectMessages;
