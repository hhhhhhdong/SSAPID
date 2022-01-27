console.log("서비스 워커 로드됨...");

self.addEventListener("push", (e) => {
  const data = e.data.json();
  console.log("push 받음");
  self.registration.showNotification(data.title, {
    body: "Notified by Node",
    icon: "",
  });
});
