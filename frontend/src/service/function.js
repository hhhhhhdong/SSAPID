import { getDatabase, push, ref, set } from "firebase/database";

export function makeChatRoom(data) {
  const db = getDatabase();
  push(ref(db, "chatRoom/"), {
    chatKey: data.chatKey,
    chatData: {
      userNickname: data.userNickname,
      message: data.message,
      timeStamp: data.timeStamp,
    },
  });
}

export function makeUser(data) {
  const db = getDatabase();
  push(ref(db, "user/"), {
    userNickname: data.userNickname,
    chatRoomList: data.chatRoomList,
  });
}
