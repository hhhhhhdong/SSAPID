import { getDatabase, push, ref, set } from "firebase/database";
import { Timestamp } from "firebase/firestore";

export async function makeUser(email, userNickName) {
  const db = getDatabase();
  await set(ref(db, `users/${userNickName}`), {
    email,
  });
  // console.log("만들어짐");
}

export async function makeMessage(message, room) {
  const db = getDatabase();
  const user = sessionStorage.getItem("email");
  let timestamp = "";
  timestamp += Timestamp.now().seconds;
  timestamp += Timestamp.now().nanoseconds;

  const msg = {
    timestamp,
    contents: message,
    id: user,
    time: Timestamp.now().seconds,
  };

  await set(push(ref(db, `messages/${room[0]}/message`)), msg);
}

export async function makeRead(room) {
  const db = getDatabase();
  const user = sessionStorage.getItem("email");

  const identity = {
    id: user,
    count: 0,
  };

  await set(ref(db, `messages/${room[0]}/identity`), identity);
}
