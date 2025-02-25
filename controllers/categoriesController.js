const db = require("../db/query");
const asyncHandler = require("express-async-handler");

exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await db.getCategories();
  res.render("categories", { title: "Categories", categories: categories });
});
