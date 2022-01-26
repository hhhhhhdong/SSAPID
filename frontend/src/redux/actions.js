export const authString = "authString";
export const emailString = "emailString";
export function AuthString(text) {
  return { type: authString, text };
}

export function EmailString(text) {
  return { type: emailString, text };
}
