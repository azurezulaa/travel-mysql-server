const { Router } = require("express");
const { signup, signin } = require("../controllers/authentication");

const authRoute = Router();

authRoute.post("/signup", signup);
authRoute.post("/signin", signin);

module.exports = authRoute;
