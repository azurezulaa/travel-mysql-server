const { Router } = require("express");
const {
  getAllUsers,
  getUser,
  putUser,
  deleteUser,
} = require("../controllers/users");

const userRoute = Router();

userRoute.get("/", getAllUsers);

userRoute.get("/:id", getUser).put("/:id", putUser).delete("/:id", deleteUser);

module.exports = userRoute;
