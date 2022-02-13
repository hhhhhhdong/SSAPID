import React, { useEffect, useState, useRef } from "react";
import useInterval from "utils/hooks/timerHook";
import { BiMessageAltDetail } from "react-icons/bi";
import { useDispatch } from "react-redux";
import {
  getDatabase,
  ref,
  onValue,
  onChildAdded,
  DataSnapshot,
} from "firebase/database";
import { chatRoomString } from "redux/_actions/actions";
import Badge from "react-bootstrap/Badge";
import Main from "../Main/Main";

function DirectMessages() {
  // DB에서 users 스키마를 res 해서 state
  const [state, setState] = useState({
    notifications: [],
    selectRoom: "",
  });
  const lastSelect = useRef("");
  const lastNoti = useRef();
  const [data, setData] = useState([]);
  // 가져온 users 스키마를 바탕으로 users state 형성
  const [users, setUsers] = useState([]);
  const [isShow, setShow] = useState(false);
  // 선택 정보
  const dispatch = useDispatch();
  const pattern = /[.#/$]/;
  const regexAllCase = new RegExp(pattern, "gi");

  useInterval(() => {
    let isComponentMounted = true;
    const users = addUsersListeners();
    chatRoomListeners();
    if (isComponentMounted) {
      setUsers(users);
    }

    return () => {
      isComponentMounted = false;
    };
  }, 1000);

  // 렌더링 될때마다 db에서 스키마 로딩
  // useEffect(() => {
  //   let isComponentMounted = true;
  //   const users = addUsersListeners();
  //   if (isComponentMounted) {
  //     setUsers(users);
  //   }

  //   return () => {
  //     isComponentMounted = false;
  //   };
  // }, []);

  // useEffect(() => {
  //   let isComponentMounted = true;
  //   chatRoomListeners();
  //   if (isComponentMounted) {
  //     setState({ notifications: lastNoti });
  //     // readDataListeners();
  //   }
  //   return () => {
  //     isComponentMounted = false;
  //   };
  // }, [lastSelect]);

  // const getNotification = (chatRoom) => {};
  // 전에 내가 보낸
  // db에 noticount 정보(내가 안읽은 정보)가 있다 ? noti identitiy 내거의 count를 return 전에 현재 noti의 count를 db의 정보로 동기화 : getNoti함수 실행
  // const readDataListeners = () => {
  //   let count;
  //   return count;
  // };

  // 데이터 스냅샷을 이용해서 DB에서 스키마를 가지고 조작
  function addUsersListeners() {
    const usersArray = [];
    const myEmail = sessionStorage.getItem("email");
    onChildAdded(ref(getDatabase(), "users"), (DataSnapshot) => {
      if (myEmail !== DataSnapshot.val().email) {
        // eslint-disable-next-line prefer-const
        let user = DataSnapshot.val();
        const room = getChatRoomId(user.email);
        user.nickName = DataSnapshot.key;
        user.roomId = room;
        usersArray.push(user);
      }
    });
    return usersArray;
  }

  // 방 ID 생성
  const getChatRoomId = (userId) => {
    const mine = sessionStorage.getItem("email");
    if (mine) {
      const user = mine.replace(regexAllCase, "");
      const your = userId.replace(regexAllCase, "");
      return user > your ? `${user}${your}` : `${your}${user}`;
    }
    return null;
  };

  // 채팅 룸 변경
  const changeChatRoom = (user) => {
    const chatRoomId = getChatRoomId(user.email);
    const chatRoomData = [chatRoomId, user.nickName];
    dispatch(chatRoomString(chatRoomData));
    lastSelect.current = user.roomId;
    if (user.email === state.selectRoom) {
      setShow(!isShow);
    } else {
      setShow(true);
    }
  };

  const chatRoomListeners = () => {
    onChildAdded(ref(getDatabase(), "messages"), (DataSnapshot) => {
      addNotificationListener(DataSnapshot.key);
    });
  };

  const addNotificationListener = (roomId) => {
    onValue(
      ref(getDatabase(), `messages/${roomId}/identity`),
      (DataSnapshot) => {
        handleNotification(DataSnapshot, roomId);
      }
    );
  };

  const handleNotification = (DataSnapshot, roomId) => {
    console.log(DataSnapshot.val());
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
          backgroundColor: user.email === isShow && "#ffffff45",
          marginBottom: "0.5em",
        }}
      >
        <Badge variant="danger" style={{ marginRight: "1em" }}>
          {/* {getNotification(user.roomId)} */}
        </Badge>
        # {user.nickName}
      </li>
    ));

  return (
    <div>
      <span
        style={{
          display: "flex",
          justifyContent: "right",
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
          textAlign: "right",
        }}
      >
        {renderDirectMessages(users)}
      </ul>
      <hr />
      {isShow && <Main key={state.selectRoom} setData={setData} />}
    </div>
  );
}

export default DirectMessages;
