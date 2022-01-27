import { getMessaging, getToken } from "firebase/messaging";

const messaging = getMessaging();
export const token = getToken(messaging, {
  vapidKey:
    "BBR-NKsdyu6DqKw3jZBZdsFPJCSNnXWafstRF8DG9wR84CH3P9zZHwqQIGWaWBtvCoemNfJFRcXFCi-WRgF0RH8",
})
  .then((currentToken) => {
    if (currentToken) {
      console.log(currentToken);
    } else {
      console.log("No registration");
    }
  })
  .catch((err) => {
    console.log("An error", err);
  });

// 토큰 cHOz2s6_xwBFnjnRBKuVxm:APA91bFX7lZufagJoyH8xxKWy8ZXBpfYSc2xSjU8PcbdE6lvEuBZvKqmq4tOwTCstP1QxLnD-a2-P-4Ej-rwgnvomvmc9hnV8svNDXlZ8ntlIvvATmwJKHV-LfPLxy2mfU4ORECoH0ZT
