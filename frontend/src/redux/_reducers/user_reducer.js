/* eslint-disable func-names */
/* eslint-disable default-param-last */
import {
  OPEN_SIDEBAR,
  AUTH_STRING,
  EMAIL_STRING,
  CHATROOM_STRING,
  LIKE_STRING,
  LIKE_BOOL,
} from "redux/_actions/types";

export default function (
  state = {
    openSidebar: false,
    authString: "",
    emailString: "",
    chatRoomString: null,
    isLikeString: null,
    isLikeBool: [true, ""],
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
      return { ...state, chatRoomString: action.payload };
    case LIKE_STRING:
      return { ...state, isLikeString: action.payload };
    case LIKE_BOOL:
      return { ...state, isLikeBool: action.payload };
    default:
      return state;
  }
}
