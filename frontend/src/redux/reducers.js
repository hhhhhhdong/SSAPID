import { nickString, authString } from "./actions";

export function makeAuth(previousState, action) {
  if (previousState === undefined) {
    return "";
  }

  // 변경이 일어나는 로직
  if (action.type === authString) {
    return action.text;
  }
  // 변경이 안일어났을 때
  return "";
}

export function makeNick(previousState, action) {
  if (previousState === undefined) {
    return "";
  }
  if (action.type === nickString) {
    return action.text;
  }
  return previousState;
}
