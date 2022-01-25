import { authString } from "./actions";

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
