const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const signup = (req, res) => {
  try {
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
  } catch (err) {
    res
      .status(400)
      .json({ message: "Шинэ хэрэглэгчийг бүртгэхэд алдаа гарлаа" });
  }
};

const signin = (req, res) => {
  try {
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
  } catch (err) {
    res.status(400).json({ message: "Нэвтрэхэд алдаа гарлаа" });
  }
};

module.exports = { signup, signin };
