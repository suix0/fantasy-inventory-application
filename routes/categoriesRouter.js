const categoriesController = require("../controllers/categoriesController");
const { Router } = require("express");

const categoriesRouter = Router();

categoriesRouter.get("/", categoriesController.getCategories);

module.exports = categoriesRouter;
