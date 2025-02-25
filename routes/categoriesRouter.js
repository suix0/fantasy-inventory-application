const categoriesController = require("../controllers/categoriesController");
const { Router } = require("express");

const categoriesRouter = Router();

categoriesRouter.get("/", categoriesController.getCategories);
categoriesRouter.get("/:categoryId", categoriesController.getCategoryItems);

categoriesRouter.post("/new", categoriesController.postNewCategory);

module.exports = categoriesRouter;
