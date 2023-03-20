const connection = require("../config/db");
const json2query = require("../utils/jsonToQuery");

const getAllTravels = (req, res) => {
  const query = `SELECT * FROM travel`;
  connection.query(query, (err, result) => {
    if (err) {
      res.status(401).json({ message: err.message });
      return;
    }
    res.json({ message: "Хүсэлт амжилттай", data: result });
  });
};

const getTravel = (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM travel WHERE id=?`;
  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ message: "Хүсэлт амжилттай", data: result[0] });
  });
};

const createTravel = (req, res) => {
  const { title, images, detail, price, location, day, catID } = req.body;
  const query =
    "INSERT INTO travel (id, title, images, detail, price, location, day, cat_id) VALUES( null, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(
    query,
    [title, images, detail, price, location, day, catID],
    (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(201).json({ message: "Шинэ аялал бүртгэгдлээ." });
    }
  );
};

const putTravel = (req, res) => {
  const a = json2query(req.body);
  const query = `UPDATE travel SET ${a} WHERE id=?`;
  connection.query(query, [req.params.id], (err, result) => {
    if (err) {
      res.status(401).json({ message: err.message });
      return;
    }
    res.json({
      message: "Аяллын мэдээлэл амжилттай шинэчлэгдлээ",
      data: result[0],
    });
  });
};

const deleteTravel = (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM travel WHERE id=?`;
  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({
      message: "Аяллын мэдээлэл амжилттай устлаа",
      data: result[0],
    });
  });
};
module.exports = {
  getAllTravels,
  getTravel,
  putTravel,
  deleteTravel,
  createTravel,
};
