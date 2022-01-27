import { getDatabase, push, ref, set } from "firebase/database";

export function makeChatRoom(data) {
  const db = getDatabase();
  push(ref(db, "/chatRoom/"), {
    timestamp: data.timestamp,
  });
}

export function makeUser(data) {
  const db = getDatabase();
  const userToken = data.accessToken;
  push(ref(db, "uid/"), {
    [userToken]: data.accessToken,
  });
}
