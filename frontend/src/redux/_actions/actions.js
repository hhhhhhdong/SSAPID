import {
  OPEN_SIDEBAR,
  AUTH_STRING,
  EMAIL_STRING,
  CHATROOM_STRING,
} from "./types";

export function openSidebar(data) {
  return {
    type: OPEN_SIDEBAR,
    payload: data,
  };
}
export function authString(data) {
  return {
    type: AUTH_STRING,
    payload: data,
  };
}
export function emailString(data) {
  return {
    type: EMAIL_STRING,
    payload: data,
  };
}

export function chatRoomString(data) {
  return {
    type: CHATROOM_STRING,
    payload: data,
  };
}

// export const authString = "authString";
// export const emailString = "emailString";
// export function AuthString(text) {
//   return { type: authString, text };
// }

// export function EmailString(text) {
//   return { type: emailString, text };
// }
