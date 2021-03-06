import React, { useState, useRef } from "react";
import useInterval from "utils/hooks/timerHook";
import { BiMessageAltDetail } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { style } from "typestyle";
import { getDatabase, ref, onChildAdded } from "firebase/database";
import { chatRoomString } from "redux/_actions/actions";
import Main from "../Main/Main";

type userList = {
  nickName: string;
  uid: string;
};

const hoverColor = style({
  $nest: {
    "&:hover": {
      backgroundColor: "#ffffff45",
    },
  },
});

function DirectMessages() {
  // DB에서 users 스키마를 res 해서 state
  const [state, setState] = useState({
    notifications: [],
    selectRoom: "",
  });
  const lastSelect = useRef("");
  const [data, setData] = useState([]);
  // 가져온 users 스키마를 바탕으로 users state 형성
  const [users, setUsers] = useState<Array<userList>>([]);
  const [isShow, setShow] = useState(false);
  // 선택 정보
  const dispatch = useDispatch();
  const pattern = /[.#/$]/;
  const regexAllCase = new RegExp(pattern, "gi");

  useInterval(() => {
    let isComponentMounted = true;
    const users = addUsersListeners();
    // chatRoomListeners();
    if (isComponentMounted) {
      setUsers(users);
    }

    return () => {
      isComponentMounted = false;
    };
  }, 1000);

  // 데이터 스냅샷을 이용해서 DB에서 스키마를 가지고 조작
  function addUsersListeners() {
    const usersArray: Array<userList> = [];
    const myEmail = sessionStorage.getItem("email")?.replace(".", "");
    onChildAdded(ref(getDatabase(), "users"), (DataSnapshot) => {
      if (myEmail !== DataSnapshot.val().email) {
        if (DataSnapshot.key && !DataSnapshot.val().dist) {
          // eslint-disable-next-line prefer-const
          let user = DataSnapshot.val();

          user.uid = DataSnapshot.key;
          user.nickName = user.userNickName;
          usersArray.push(user);
        }
      }
    });
    return usersArray;
  }

  // 방 ID 생성
  const getChatRoomId = (userId: string) => {
    const mine = sessionStorage.getItem("uid");
    if (mine) {
      const user = mine.replace(regexAllCase, "");
      const your = userId.replace(regexAllCase, "");
      return user > your ? `${user}${your}` : `${your}${user}`;
    }
    return null;
  };

  // 채팅 룸 변경
  const changeChatRoom = (user: userList) => {
    const chatRoomId = getChatRoomId(user.uid);
    const chatRoomData = [chatRoomId, user.nickName];
    dispatch(chatRoomString(chatRoomData));
    if (user.nickName === lastSelect.current) {
      setShow(!isShow);
    } else {
      setShow(true);
    }
    lastSelect.current = user.nickName;
  };

  // 닉네임 렌더링
  const renderDirectMessages = (users: Array<userList>) =>
    users.length > 0 &&
    users.map((user: userList) => (
      <li
        key={user.nickName}
        onClick={() => changeChatRoom(user)}
        aria-hidden="true"
        style={{ marginBottom: "1em" }}
      >
        <span
          className={hoverColor}
          style={{
            backgroundColor:
              lastSelect.current === user.nickName && isShow ? "#ffffff45" : "",
            marginBottom: "0.5em",
          }}
        >
          # {user.nickName}
        </span>
      </li>
    ));

  return (
    <div style={{ marginTop: "3em" }}>
      <span
        style={{
          display: "flex",
          justifyContent: "right",
          fontSize: "1.5em",
          marginBottom: "1em",
        }}
      >
        <BiMessageAltDetail />
        Direct Message ({users.length})
      </span>
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
          cursor: "pointer",
          textAlign: "right",
        }}
      >
        {renderDirectMessages(users)}
      </ul>
      <hr />
      {isShow && <Main setData={setData} />}
    </div>
  );
}

export default DirectMessages;
