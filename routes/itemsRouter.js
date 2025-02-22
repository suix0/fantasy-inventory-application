const { Router } = require("express");

const itemsRouter = Router();

itemsRouter.get("/", getAllItems);
itemsRouter.get("/new", getNewItem);
itemsRouter.post("/new", postNewItem);

module.exports = itemsRouter;
