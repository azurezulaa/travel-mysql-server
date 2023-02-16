const { Router } = require("express");
const {
  getAllUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
} = require("../controllers/users");

const userRoute = Router();

userRoute.get("/", getAllUsers);

userRoute
  .get("/:id", getUser)
  .post("/:id", postUser)
  .put("/:id", putUser)
  .delete("/:id", deleteUser);

userRoute.post("/signup");

userRoute.post("/signin");

module.exports = userRoute;
