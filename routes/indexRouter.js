const indexController = require("../controllers/indexControllers");
const { Router } = require("express");

const indexRoute = Router();

indexRoute.get("/", indexController.getAllItems);
indexRoute.get("/weapon", indexController.getWeapons);
indexRoute.get("/armor", indexController.getArmors);
module.exports = indexRoute;
