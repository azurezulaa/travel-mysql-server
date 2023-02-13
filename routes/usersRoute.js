const { Router } = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const userRoute = Router();

userRoute.get("/", (req, res) => {
  fs.readFile("users.json", "utf-8", (err, data) => {
    if (err) {
      console.log("Сервертэй холбогдоход алдаа гарлаа");
      return;
    }
    const parsedData = JSON.parse(data);
    res.status(201).json({ users: parsedData.users });
  });
});

userRoute.get("/:id", (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync("users.json", "utf-8");
  const parsedData = JSON.parse(data);
  const user = parsedData.users.find((el) => el.id === id);
  res.status(200).json({ user });
});

userRoute.put("/:id", (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync("users.json", "utf-8");
  const parsedData = JSON.parse(data);
  const findIndex = parsedData.users.findIndex((el) => el.id === id);
  parsedData.users[findIndex] = { ...parsedData.users[findIndex], ...req.body };
  fs.writeFileSync("users.json", JSON.stringify(parsedData));
  res.status(201).json({ message: "Хэрэглэгчийн өгөгдөл амжилттай солигдлоо" });
});

userRoute.post("/", (req, res) => {
  const data = fs.readFileSync("users.json", "utf-8");
  const parsedData = JSON.parse(data);
  const newUser = { ...req.body };
  parsedData.users.push(newUser);
  fs.writeFileSync("users.json", JSON.stringify(parsedData));
  res.status(201).json({ message: "Шинэ хэрэглэгчийг амжилттай бүртгэлээ" });
});

userRoute.delete("/:id", (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync("users.json", "utf-8");
  const parsedData = JSON.parse(data);
  const findIndex = parsedData.users.findIndex((el) => el.id === id);
  parsedData.users.splice(findIndex, 1);
  fs.writeFileSync("users.json", JSON.stringify(parsedData));
  res.status(201).json({ message: `Хэрэглэгчийн мэдээлэл устгагдлаа` });
});

userRoute.post("/signup", (req, res) => {
  const { name, role = "user", email, password } = req.body;
  const data = fs.readFileSync("users.json", "utf-8");
  const parsedData = JSON.parse(data);
  const id = uuidv4();
  const salted = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salted);

  const newUser = {
    id,
    name,
    role,
    email,
    password: hashedPassword,
  };
  parsedData.users.push(newUser);
  fs.writeFileSync("users.json", JSON.stringify(parsedData));

  res.status(201).json({ message: "Шинэ хэрэглэгчийг амжилттай бүртгэлээ" });
});

userRoute.post("/signin", (req, res) => {
  const { email, password } = req.body;
  const data = fs.readFileSync("users.json", "utf-8");
  const parsedData = JSON.parse(data);
  const findUser = parsedData.users.find((user) => user.email === email);
  if (!findUser) {
    res.status(401).json({ message: "Ийм хэрэглэгч олдсонгүй" });
  }
  const isCheck = bcrypt.compareSync(password, findUser.password);
  if (isCheck) {
    res.status(200).json({ message: "Амжилттай нэвтэрлээ", user: findUser });
  } else {
    res
      .status(401)
      .json({ message: "Имэйл эсвэл нууц үг буруу байна.", user: null });
  }
});

module.exports = userRoute;
