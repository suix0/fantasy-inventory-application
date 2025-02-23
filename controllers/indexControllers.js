const db = require("../db/query");
const asyncHandler = require("express-async-handler");

exports.getAllItems = asyncHandler(async (req, res) => {
  const items = await db.getItems();
  const categories = await db.getCategories();
  res.render("index", { items: items, categories: categories, title: "Home" });
});

exports.getWeapons = asyncHandler(async (req, res) => {
  const items = await db.getWeapons();
  const categories = await db.getCategories();
  res.render("index", {
    items: items,
    categories: categories,
    currentCategory: "Weapon",
    title: "Weapons",
  });
});

exports.getArmors = asyncHandler(async (req, res) => {
  const items = await db.getArmors();
  const categories = await db.getCategories();
  res.render("index", {
    items: items,
    categories: categories,
    currentCategory: "Armor",
    title: "Armors",
  });
});

exports.getPotions = asyncHandler(async (req, res) => {
  const items = await db.getPotions();
  const categories = await db.getCategories();
  res.render("index", {
    items: items,
    categories: categories,
    currentCategory: "Potions",
    title: "Armors",
  });
});
