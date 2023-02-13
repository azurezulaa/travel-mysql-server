const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/usersRoute");

const port = 8000;

const server = express();
server.use(cors());
server.use(express.json());
server.use("/users", userRoute);

server.get("/", (req, res) => {
  res.status(200).json({ message: "Hello express Server" });
});

server.listen(port, () => {
  console.log("server aslaa");
});
