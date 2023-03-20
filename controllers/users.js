const connection = require("../config/db");
const json2query = require("../utils/jsonToQuery");

const getAllUsers = (req, res) => {
  const query = `SELECT * FROM user`;
  connection.query(query, (err, result) => {
    if (err) {
      res.status(401).json({ message: err.message });
      return;
    }
    res.json({ message: "Хүсэлт амжилттай", data: result });
  });
};

const getUser = (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM user WHERE id=?`;
  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ message: "Хүсэлт амжилттай", data: result[0] });
  });
};

const putUser = (req, res) => {
  const a = json2query(req.body);
  const query = `UPDATE user SET ${a} WHERE id=?`;
  connection.query(query, [req.params.id], (err, result) => {
    if (err) {
      res.status(401).json({ message: err.message });
      return;
    }
    res.json({
      message: "Хэрэглэгчийн мэдээлэл амжилттай шинэчлэгдлээ",
      data: result[0],
    });
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM user WHERE id=?`;
  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({
      message: "Хэрэглэгчийн мэдээлэл амжилттай устлаа",
      data: result[0],
    });
  });
};
module.exports = { getAllUsers, getUser, putUser, deleteUser };
