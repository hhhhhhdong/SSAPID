import { getDatabase, push, ref, set } from "firebase/database";
import { Timestamp } from "firebase/firestore";

export async function makeUser(email, userNickName) {
  const db = getDatabase();
  await set(ref(db, `users/${userNickName}`), {
    email,
  });
}

export async function makeMessage(message, room) {
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

  await set(push(ref(db, `messages/${room[0]}`)), msg);
}
