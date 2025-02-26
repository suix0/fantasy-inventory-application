const categoriesController = require("../controllers/categoriesController");
const { Router } = require("express");

const categoriesRouter = Router();

categoriesRouter.get("/", categoriesController.getCategories);
categoriesRouter.get("/:categoryId", categoriesController.getCategoryItems);

categoriesRouter.post("/new", categoriesController.postNewCategory);

categoriesRouter.post(
  "/delete/:categoryId",
  categoriesController.postDeleteCategory
);

categoriesRouter.post(
  "/edit/:categoryId",
  categoriesController.postEditCategory
);

module.exports = categoriesRouter;
