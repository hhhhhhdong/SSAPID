const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

const publicVapidKey =
  "BKJsDYy7v3nj9gWpopUKFE_8GAdVrkCzav1upeFzbfKO-KM1mGLvSUElr3eC-U3V6lub_bO7vD3jr_zyACi1IV4";
const privateVapidKey = "FQEC2-RwsiZySzFfxLNMmaZEbflAoSa1MQSYDmF03us";

webpush.setVapidDetails(
  "mailto:now20412041@gmail.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route
app.post("/push/subscribe", (req, res) => {
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: "Push Test" });

  // Pass Object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.log(err));
});

const port = 5000;

app.listen(port, () => console.log(`server started on port ${port}`));
