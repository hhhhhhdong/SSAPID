const publicVapidKey =
  "BKJsDYy7v3nj9gWpopUKFE_8GAdVrkCzav1upeFzbfKO-KM1mGLvSUElr3eC-U3V6lub_bO7vD3jr_zyACi1IV4"; // Check for service worker
if ("serviceWorker" in navigator) {
  send().catch((err) => console.error(err));
}
// 서비스워커 등록, 푸쉬 등록, 푸쉬 보내기
async function send() {
  // 서비스워커 등록
  console.log("서비스워커 등록중...");
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/",
  });
  console.log("서비스워커 등록됨");
  // 푸쉬 등록
  console.log("푸쉬 등록중..");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });
  console.log("푸쉬 등록 됨");
  // 푸쉬 보내기
  console.log("푸쉬 보내기");
  await fetch("http://localhost:5000/push/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: { "content-type": "application/json" },
  });
  console.log("푸쉬 보냄");
} // Vapid key를 안전하게 base64 스트링을 Unit8Array로 변환..
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i += 1) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
