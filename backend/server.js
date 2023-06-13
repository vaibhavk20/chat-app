const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");
dotenv.config();

// connection db
connectDB();

const app = express();

app.use(express.json());

// app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

const server = app.listen(port, console.log(`server is running at ${port}`));

const io = require("socket.io")(server, {
  // it help to wait for 60sec to wait then lost connectinon
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

// socket came from the socket.io ref documentation emiting events
io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  // help to connet with the help of the user._id pass from frontend useEffect;
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    // console.log(userData._id)
    // pass from server to frontend
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    let chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      // seder id check for self messages
      if (user._id == newMessageRecieved.sender._id) return;
      // reciever user._id
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
});
