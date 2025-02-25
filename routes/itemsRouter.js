const itemsController = require("../controllers/itemsController");
const { Router } = require("express");
const itemsRouter = Router();

itemsRouter.get("/", itemsController.getAllItems);
itemsRouter.get("/search", itemsController.getItem);

itemsRouter.get("/new", itemsController.getNewItem);
itemsRouter.post("/new", itemsController.postNewItem);

itemsRouter.get("/edit/:itemId", itemsController.getEditItem);
itemsRouter.post("/edit/:itemId", itemsController.postEditItem);
itemsRouter.get("/delete/:itemId", itemsController.getDeleteItem);
itemsRouter.post("/delete/:itemId", itemsController.postDeleteItem);
module.exports = itemsRouter;
