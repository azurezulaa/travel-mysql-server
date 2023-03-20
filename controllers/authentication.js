const connection = require("../config/db");
const bcrypt = require("bcrypt");

// const signup = (req, res) => {
//   try {
//     const { name, role = "user", email, password } = req.body;
//     const data = fs.readFileSync("users.json", "utf-8");
//     const parsedData = JSON.parse(data);
//     const id = uuidv4();
//     const salted = bcrypt.genSaltSync(10);
//     const hashedPassword = bcrypt.hashSync(password, salted);

//     const newUser = {
//       id,
//       name,
//       role,
//       email,
//       password: hashedPassword,
//     };
//     parsedData.users.push(newUser);
//     fs.writeFileSync("users.json", JSON.stringify(parsedData));

//     res.status(201).json({ message: "Шинэ хэрэглэгчийг амжилттай бүртгэлээ" });
//   } catch (err) {
//     res
//       .status(400)
//       .json({ message: "Шинэ хэрэглэгчийг бүртгэхэд алдаа гарлаа" });
//   }
// };
const signup = (req, res) => {
  const { name, email, password, phoneNumber } = req.body;
  const salted = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salted);
  const query =
    "INSERT INTO user (id, name,email,password, phone_number, profile_img) VALUES( null, ?, ?, ?, ?, ?)";
  connection.query(
    query,
    [name, email, hashedPassword, phoneNumber, "url"],
    (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res
        .status(201)
        .json({ message: "Шинэ хэрэглэгч амжилттай бүртгэгдлээ." });
    }
  );
};

const signin = (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT name,password FROM user WHERE email=?`;
  connection.query(query, [email], (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (result[0] == null) {
      res.status(400).json({ message: "Ийм хэрэглэгч олдсонгүй" });
      return;
    }
    const isCheck = bcrypt.compareSync(password, result[0].password);
    if (isCheck) {
      res.status(200).json({ message: "Амжилттай нэвтэрлээ", user: result[0] });
    } else {
      res
        .status(401)
        .json({ message: "Имэйл эсвэл нууц үг буруу байна.", user: null });
    }
  });
};

module.exports = { signup, signin };
