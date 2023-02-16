const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/usersRoute");
const authRoute = require("./routes/authRoute");

const port = 8000;

const server = express();

server.use(cors());
server.use(express.json());

server.use("/users", userRoute);
server.use("/auth", authRoute);

server.get("/", (req, res) => {
  res.status(200).json({ message: "Hello express Server" });
});

server.listen(port, () => {
  console.log("server aslaa");
});
