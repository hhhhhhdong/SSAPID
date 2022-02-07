import { getDatabase, push, ref, set } from "firebase/database";
import { Timestamp } from "firebase/firestore";

export function makeUser(email, userNickName, token) {
  const db = getDatabase();
  set(ref(db, `users/${userNickName}`), {
    email,
    token,
  });
}

export function makeMessage(message, room) {
  const db = getDatabase();
  const user = sessionStorage.getItem("userNickname");
  let timestamp = "";
  timestamp += Timestamp.now().seconds;
  timestamp += Timestamp.now().nanoseconds;

  const msg = {
    timestamp,
    id: user,
    contents: message,
    time: Timestamp.now().seconds,
  };

  set(push(ref(db, `messages/${room[0]}`)), msg);
}
