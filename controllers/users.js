const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const getAllUsers = (req, res) => {
  fs.readFile("users.json", "utf-8", (err, data) => {
    if (err) {
      console.log("Сервертэй холбогдоход алдаа гарлаа");
      return;
    }
    const parsedData = JSON.parse(data);
    res.status(201).json({ users: parsedData.users });
  });
};

const getUser = (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync("users.json", "utf-8");
  const parsedData = JSON.parse(data);
  const user = parsedData.users.find((el) => el.id === id);
  res.status(200).json({ user });
};

const putUser = (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync("users.json", "utf-8");
  const parsedData = JSON.parse(data);
  const findIndex = parsedData.users.findIndex((el) => el.id === id);
  parsedData.users[findIndex] = { ...parsedData.users[findIndex], ...req.body };
  fs.writeFileSync("users.json", JSON.stringify(parsedData));
  res.status(201).json({ message: "Хэрэглэгчийн өгөгдөл амжилттай солигдлоо" });
};

const postUser = (req, res) => {
  const data = fs.readFileSync("users.json", "utf-8");
  const parsedData = JSON.parse(data);
  const newUser = { ...req.body };
  parsedData.users.push(newUser);
  fs.writeFileSync("users.json", JSON.stringify(parsedData));
  res.status(201).json({ message: "Шинэ хэрэглэгчийг амжилттай бүртгэлээ" });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync("users.json", "utf-8");
  const parsedData = JSON.parse(data);
  const findIndex = parsedData.users.findIndex((el) => el.id === id);
  parsedData.users.splice(findIndex, 1);
  fs.writeFileSync("users.json", JSON.stringify(parsedData));
  res.status(201).json({ message: `Хэрэглэгчийн мэдээлэл устгагдлаа` });
};
module.exports = { getAllUsers, getUser, putUser, postUser, deleteUser };
