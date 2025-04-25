const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv/config");

const bodyParser = require("body-parser");
const connectDB = require("./db.js");
const initSocket = require("./socket.js");
const http = require("http");

// Middleware to parse JSON data
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(express.json());
connectDB();
app.use("/", require("./Controllers/productsController"));
app.use("/", require("./Controllers/userController.js"));
app.use("/", require("./Controllers/favoritesController.js"));
app.use("/", require("./Controllers/chatController.js"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
const server = http.createServer(app);
const io = initSocket(server);

server.listen(process.env.PORT || 4000, () => {
  console.log("Listening on port 4000");
});
