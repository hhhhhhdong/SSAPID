import { getMessaging, getToken } from "firebase/messaging";

export const messaging = getMessaging();
export const token = getToken(messaging, {
  vapidKey:
    "BBR-NKsdyu6DqKw3jZBZdsFPJCSNnXWafstRF8DG9wR84CH3P9zZHwqQIGWaWBtvCoemNfJFRcXFCi-WRgF0RH8",
})
  .then((currentToken) => {
    if (currentToken) {
      console.log("토큰:", currentToken);
    } else {
      console.log("No registration token");
    }
  })
  .catch((err) => {
    console.log("An error");
  });
