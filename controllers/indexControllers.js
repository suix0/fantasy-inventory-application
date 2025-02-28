const db = require("../db/query");
const asyncHandler = require("express-async-handler");

exports.getAllItems = asyncHandler(async (req, res) => {
  const items = await db.getItems();
  const categories = await db.getCategories();
  res.render("index", {
    items: items,
    categories: categories,
    title: "RPG Inventory",
    currentCategory: "All",
  });
});

exports.getFavoriteItems = asyncHandler(async (req, res) => {
  const favoriteItems = await db.getFavoriteItems();
  const categories = await db.getCategories();
  res.render("index", {
    items: favoriteItems,
    categories: categories,
    title: "Favorites",
    currentCategory: "Favorites",
  });
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
    title: "Potions",
  });
});

exports.getCustomCategoryItems = asyncHandler(async (req, res) => {
  const categoryId = Number(req.params.categoryId);
  const category = await db.getCategory(categoryId);
  const items = await db.getCategoryItems(categoryId);
  const categories = await db.getCategories();
  res.render("index", {
    items: items,
    categories: categories,
    currentCategory: category[0].category_name,
    title: category[0].category_name,
  });
});
