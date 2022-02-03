/* eslint-disable func-names */
/* eslint-disable default-param-last */
import {
  OPEN_SIDEBAR,
  AUTH_STRING,
  EMAIL_STRING,
  CHATROOM_STRING,
} from "redux/_actions/types";

export default function (
  state = {
    openSidebar: true,
    authString: "",
    emailString: "",
    currentChatRoom: null,
  },
  action
) {
  switch (action.type) {
    case OPEN_SIDEBAR:
      return { ...state, openSidebar: action.payload };
    case AUTH_STRING:
      return { ...state, authString: action.payload };
    case EMAIL_STRING:
      return { ...state, emailString: action.payload };
    case CHATROOM_STRING:
      return { ...state, currentChatRoom: action.payload };
    default:
      return state;
  }
}

// import { authString, emailString } from "../_actions/actions";

// export function userReduser(previousState, action) {
//   if (previousState === undefined) {
//     return "";
//   }

//   // 변경이 일어나는 로직
//   if (action.type === authString) {
//     return action.text;
//   }
//   // 변경이 안일어났을 때
//   return "";
// }

// export function makeEmail(previousState, action) {
//   if (previousState === undefined) {
//     return "";
//   }

//   // 변경이 일어나는 로직
//   if (action.type === emailString) {
//     return action.text;
//   }
//   // 변경이 안일어났을 때
//   return "";
// }
