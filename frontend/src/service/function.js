import { getDatabase, ref, set } from "firebase/database";

export function sendChat(data) {
  const db = getDatabase();
  set(ref(db, "chats/"), {
    message: data.message,
    timestamp: data.timestamp,
    uid: data.uid,
  });
}
