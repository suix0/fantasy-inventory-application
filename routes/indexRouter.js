const indexController = require("../controllers/indexControllers");
const { Router } = require("express");

const indexRouter = Router();

indexRouter.get("/", indexController.getAllItems);
indexRouter.get("/weapon", indexController.getWeapons);
indexRouter.get("/armor", indexController.getArmors);
indexRouter.get("/potions", indexController.getPotions);
indexRouter.get(
  "/customCategory/:categoryId",
  indexController.getCustomCategoryItems
);
module.exports = indexRouter;
