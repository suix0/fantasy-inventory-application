const itemsController = require("../controllers/itemsController");
const { Router } = require("express");
const itemsRouter = Router();

itemsRouter.get("/", itemsController.getAllItems);
itemsRouter.get("/search", itemsController.getItem);
// itemsRouter.get("/new", getNewItem);
// itemsRouter.post("/new", postNewItem);

module.exports = itemsRouter;
