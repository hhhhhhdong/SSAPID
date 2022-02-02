import { getDatabase, push, ref, set } from "firebase/database";

export function makeChatRoom(data) {
  const db = getDatabase();
  push(ref(db, "/chatRoom/"), {
    timestamp: data.timestamp,
  });
}

export function makeUser(email, userNickName) {
  const db = getDatabase();
  set(ref(db, `users/${userNickName}`), {
    email,
  });
}
