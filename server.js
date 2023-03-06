const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const userRoute = require("./routes/usersRoute");
const authRoute = require("./routes/authRoute");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "azure_db",
});

const port = 8000;

const server = express();

server.use(cors());
server.use(express.json());

server.use("/users", userRoute);
server.use("/auth", authRoute);

server.get("/", async (req, res) => {
  connection.query(`SELECT * FROM azure_user`, (err, result) => {
    if (err) {
      res.status(401).json({ message: err.message });
      return;
    }
    res.json({ message: "AZURE SERVER: huselt amjilttai", data: result });
  });
});

server.post("/", async (req, res) => {
  connection.query(
    `INSERT INTO azure_user VALUES(${req.body.id},"${req.body.name}","${req.body.lastname}")`,
    (err, result) => {
      if (err) {
        res.status(401).json({ message: err.message });
        return;
      }
      res.json({ message: "AZURE SERVER: amjilttai burtgelee", data: result });
    }
  );
});

server.get("/:id", async (req, res) => {
  connection.query(
    `SELECT * FROM azure_user WHERE id=${req.params.id}`,
    (err, result) => {
      if (err) {
        res.status(401).json({ message: err.message });
        return;
      }
      res.json({ message: "AZURE SERVER: huselt amjilttai", data: result });
    }
  );
});

server.put("/:id", async (req, res) => {
  const body = req.body;
  const keys = Object.keys(body);
  const values = Object.values(body);

  let a = keys.map((key) => `${key}="${body[key]}"`).join();
  console.log(a);
  connection.query(
    `UPDATE azure_user SET ${a} WHERE id=${req.params.id}`,
    (err, result) => {
      if (err) {
        res.status(401).json({ message: err.message });
        return;
      }
      res.json({
        message: "AZURE SERVER: amjilttai shinechlegdlee",
        data: result,
      });
    }
  );
});

server.listen(port, () => {
  console.log("server aslaa");
});
