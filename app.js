// import statements
require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const http = require("http");

// socket.io boiler plate
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

// setting view engine
app.set("view engine", "ejs");

// setting public directory for locating static files
app.use(express.static(path.join(__dirname, "public")));

// handle socket io response
io.on("connection", function (socket) {
  socket.on("send-location", function (data) {
    io.emit("recieve-location", { id: socket.id, ...data });
  });
  // handle socket io while user disconnects

   socket.on("disconnect", function () {
    io.emit("user-disconnected", socket.id);
  });
});

// root route
app.get("/", (req, res) => {
  res.render("index");
});
// PORT from .env file
const PORT = process.env.PORT || 5000;

// listining server
server.listen(PORT, () => {
  // console.log("port is running on PORT", PORT);
});
