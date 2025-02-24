const db = require("../db/query");
const asyncHandler = require("express-async-handler");
const { query, body, validationResult } = require("express-validator");
const { toTitleCase } = require("../utils/strings");

const queryValidation = [
  query("search")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Search can't be empty")
    .toLowerCase(),
];

const itemValidation = [
  body("itemName")
    .trim()
    .notEmpty()
    .withMessage("Item name can't be empty.")
    .isLength({ min: 1, max: 18 })
    .withMessage("Item name must be between 1 and 19 characters."),
  body("itemDesc")
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage("Item description must be between 1 and 30 characters."),
  body("itemValue").notEmpty().withMessage("Item value can't be empty."),
  body("isFavorite")
    .notEmpty()
    .withMessage("You must decide whether it is a favorite item or not."),
];

exports.getAllItems = asyncHandler(async (req, res) => {
  const items = await db.getItems();
  res.render("items", { items: items, title: "Items", isItems: true });
});

exports.getItem = [
  queryValidation,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("not empty");
      const items = await db.getItems();
      return res.render("items", {
        items: items,
        searchError: errors.array(),
        title: "Items",
        isItems: true,
      });
    }
    const querySearch = req.query.search;

    // Case when query string has spaces
    if (querySearch.split(" ").length > 0) {
      const querySearches = querySearch.split(" ");

      // Convert each string to title case
      const newQuerySearch = querySearches.map((search) => toTitleCase(search));

      // Query each data that contains all strings (e.g. [sword, axe]
      // will return rows that contain sword or axe
      const searchResults = await db.getItem(newQuerySearch);
      return res.render("items", {
        items: searchResults,
        title: "Items",
        isItems: true,
      });

      // Case for individual string query
    } else {
      const searchResult = await db.getItem(toTitleCase(querySearch));
      res.render("items", {
        items: searchResult,
        title: "Items",
        isItems: true,
      });
    }
  }),
];

exports.getNewItem = asyncHandler(async (req, res) => {
  const items = await db.getItems();
  const categories = await db.getCategories();
  res.render("items", {
    items: items,
    categories: categories,
    openForm: true,
    isItems: true,
  });
});

exports.postNewItem = [
  itemValidation,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const items = await db.getItems();
      const categories = await db.getCategories();
      res.render("items", {
        items: items,
        categories: categories,
        openForm: true,
        newItemError: errors.array(),
        isItems: true,
      });
      return;
    }
    const newItem = req.body;
    console.log(newItem);
    await db.putNewItem(newItem);
    res.redirect("/items");
  }),
];
