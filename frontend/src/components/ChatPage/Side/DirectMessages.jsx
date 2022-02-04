import React, { useEffect, useState } from "react";
import { BiMessageAltDetail } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  getDatabase,
  ref,
  DataSnapshot,
  onChildAdded,
} from "firebase/database";
import { chatRoomString } from "redux/_actions/actions";
import Main from "../Main/Main";

function DirectMessages() {
  // DB에서 users 스키마를 res 해서 state
  const [state, setState] = useState({
    usersRef: ref(getDatabase(), "users"),
  });
  // 가져온 users 스키마를 바탕으로 users state 형성
  const [users, setUsers] = useState([]);
  const [isShow, setShow] = useState(false);
  // 선택 정보
  const [isSelect, setSelect] = useState("");

  const dispatch = useDispatch();

  // 렌더링 될때마다 db에서 스키마 로딩
  useEffect(() => {
    if (users) {
      addUsersListeners();
    }
    return () => setUsers([]);
  }, []);
  // 데이터 스냅샷을 이용해서 DB에서 스키마를 가지고 조작
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
    const chatRoomId = getChatRoomId(user.nickName);
    const chatRoomData = [chatRoomId, user.nickName];
    dispatch(chatRoomString(chatRoomData));
    setSelect(user.nickName);
    if (user.nickName === isSelect) {
      setShow(!isShow);
    } else {
      setShow(true);
    }
  };

  // 닉네임 렌더링
  const renderDirectMessages = (users) =>
    users.length > 0 &&
    users.map((user) => (
      <li
        key={user.nickName}
        onClick={() => changeChatRoom(user)}
        aria-hidden="true"
        style={{
          backgroundColor: user.nickName === isSelect && isShow && "#ffffff45",
          marginBottom: "0.5em",
        }}
      >
        # {user.nickName}
      </li>
    ));

  return (
    <div>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5em",
        }}
      >
        <BiMessageAltDetail
          style={{
            marginRight: "0.2em",
          }}
        />
        Direct Message ({users.length})
      </span>
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
          cursor: "pointer",
          textAlign: "center",
        }}
      >
        {renderDirectMessages(users)}
      </ul>
      <hr />
      {isShow && <Main key={isSelect} />}
    </div>
  );
}

export default DirectMessages;
