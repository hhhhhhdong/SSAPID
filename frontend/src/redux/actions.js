export const authString = "authString";
export const nickString = "nickString";
export function AuthString(text) {
  return { type: authString, text };
}

export function NickString(text) {
  return { type: nickString, text };
}
