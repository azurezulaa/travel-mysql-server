const { Router } = require("express");
const {
  getAllTravels,
  getTravel,
  putTravel,
  deleteTravel,
  createTravel,
} = require("../controllers/travel");
const travelRoute = Router();

travelRoute.get("/", getAllTravels).post("/", createTravel);

travelRoute
  .get("/:id", getTravel)
  .put("/:id", putTravel)
  .delete("/:id", deleteTravel);

module.exports = travelRoute;
