const db = require("../db/query");
const asyncHandler = require("express-async-handler");

exports.getAllItems = asyncHandler(async (req, res) => {
  const items = await db.getItems();
  const categories = await db.getCategories();
  res.render("index", { items: items, categories: categories });
});

exports.getWeapons = asyncHandler(async (req, res) => {
  const items = await db.getWeapons();
  const categories = await db.getCategories();
  res.render("index", {
    items: items,
    categories: categories,
    currentCategory: "Weapon",
  });
});
