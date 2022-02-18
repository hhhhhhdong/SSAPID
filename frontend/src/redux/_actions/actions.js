import {
  OPEN_SIDEBAR,
  AUTH_STRING,
  EMAIL_STRING,
  CHATROOM_STRING,
  LIKE_STRING,
  LIKE_BOOL,
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

export function isLikeString(data) {
  return {
    type: LIKE_STRING,
    payload: data,
  };
}

export function isLikeBool(data) {
  return {
    type: LIKE_BOOL,
    payload: data,
  };
}
