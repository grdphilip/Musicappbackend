require("dotenv").config();
const express = require("express");
const app = express();

/* 
Mongo socket integration: https://www.mongodb.com/developer/products/mongodb/mongo-socket-chat-example/
Mongo clusters: https://www.mongodb.com/docs/drivers/node/current/quick-start/#create-a-mongodb-cluster
Socket server API: https://socket.io/docs/v4/server-api/
*/
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.DATA,
    methods: ["GET", "POST"],
  },
});

//Socket io låter sessionen vara kvar
app.use(cors());
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

//Allows us to use any middleware we want
app.use(express.json());

const roomsRouter = require("./routes/rooms");
app.use("/rooms", roomsRouter);

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);

  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

server.listen(3000, () => {
  console.log("SERVER IS RUNNING");
});
