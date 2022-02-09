import React, { useEffect, useState, useRef } from "react";
import { BiMessageAltDetail } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { getDatabase, ref, onValue, onChildAdded } from "firebase/database";
import { chatRoomString } from "redux/_actions/actions";
import Main from "../Main/Main";

function DirectMessages() {
  // DB에서 users 스키마를 res 해서 state
  const [state, setState] = useState({
    usersRef: ref(getDatabase(), "users"),
    roomsRef: ref(getDatabase(), "messages"),
    chatRooms: [],
    notifications: [],
    selectRoom: "",
  });
  const lastSelect = useRef("");

  const [data, setData] = useState([]);
  // 가져온 users 스키마를 바탕으로 users state 형성
  const [users, setUsers] = useState([]);
  const [isShow, setShow] = useState(false);
  // 선택 정보
  const dispatch = useDispatch();
  const pattern = /[.#/$]/;
  const regexAllCase = new RegExp(pattern, "gi");

  // 렌더링 될때마다 db에서 스키마 로딩
  useEffect(() => {
    let isComponentMounted = true;
    if (users && isComponentMounted) {
      addUsersListeners();
    }
    return () => {
      isComponentMounted = false;
    };
  }, []);

  useEffect(() => {
    let isComponentMounted = true;
    if (isComponentMounted) {
      chatRoomListeners();
    }
    return () => {
      isComponentMounted = false;
    };
  }, [data]);
  // console.log(chatRooms);
  // 데이터 스냅샷을 이용해서 DB에서 스키마를 가지고 조작
  function addUsersListeners() {
    const { usersRef } = state;
    const usersArray = [];
    const myEmail = sessionStorage.getItem("email");

    onChildAdded(usersRef, (DataSnapshot) => {
      if (myEmail !== DataSnapshot.val().email) {
        // eslint-disable-next-line prefer-const
        let user = DataSnapshot.val();
        user.nickName = DataSnapshot.key;
        user.status = "offline";
        user.roomId = getChatRoomId(user.email);
        usersArray.push(user);
        setUsers([...usersArray]);
      }
    });
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
    lastSelect.current = chatRoomId;
    if (user.email === state.selectRoom) {
      setShow(!isShow);
    } else {
      setShow(true);
    }
  };

  const chatRoomListeners = () => {
    const chatRooms = [];
    onChildAdded(ref(getDatabase(), "messages"), (DataSnapshot) => {
      chatRooms.push(DataSnapshot.val());
      addNotificationListener(DataSnapshot.key);
    });
    setState({ chatRooms });
  };

  const addNotificationListener = (roomId) => {
    const { notifications } = state;

    if (notifications) {
      onValue(ref(getDatabase(), `messages/${roomId}`), (DataSnapshot) => {
        handleNotification(
          roomId,
          lastSelect.current,
          notifications,
          DataSnapshot
        );
      });
    }
  };

  const handleNotification = (
    roomId,
    currentRoom,
    notifications,
    DataSnapshot
  ) => {
    const index = notifications.findIndex(
      (notification) => notification.id === roomId
    );
    if (index === -1) {
      notifications.push({
        id: roomId,
        total: DataSnapshot.size,
        lastKnownTotal: DataSnapshot.size,
        count: 0,
      });
    } else {
      // eslint-disable-next-line no-lonely-if
      if (roomId !== currentRoom) {
        const lastTotal = notifications[index].lastKnownTotal;
        if (DataSnapshot.size - lastTotal > 0) {
          // eslint-disable-next-line no-param-reassign
          notifications[index].count = DataSnapshot.size - lastTotal;
        }
      }
      // eslint-disable-next-line no-param-reassign
      notifications[index].total = DataSnapshot.size;
    }
    setState({ notifications });
  };
  const getNotification = (chatRoom) => {
    let count = 0;
    const { notifications } = state;

    if (notifications) {
      notifications.forEach((notification) => {
        if (notification.id === chatRoom) {
          count = notification.count;
        }
      });
      if (count > 0) return count;
    }
    return null;
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
          backgroundColor:
            user.email === state.selectRoom && isShow && "#ffffff45",
          marginBottom: "0.5em",
        }}
      >
        # {user.nickName}
        <span style={{ backgroundColor: "red" }}>
          {getNotification(user.roomId)}
        </span>
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
      {isShow && <Main key={state.selectRoom} setData={setData} />}
    </div>
  );
}

export default DirectMessages;
