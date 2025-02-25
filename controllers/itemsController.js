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
    .isLength({ min: 1, max: 25 })
    .withMessage("Item name must be between 1 and 25 characters."),
  body("itemDesc")
    .trim()
    .isLength({ max: 35 })
    .withMessage("Item description can only have up to 35 characters."),
  body("itemValue").notEmpty().withMessage("Item value can't be empty."),
  body("isFavorite")
    .notEmpty()
    .withMessage("You must decide whether it is a favorite item or not."),
];

// GET READ: Get all items from db and render items
exports.getAllItems = asyncHandler(async (req, res) => {
  const items = await db.getItems();
  res.render("items", { items: items, title: "Items", isItems: true });
});

// GET SEARCH: Render an item that matches every word in search field
exports.getItem = [
  queryValidation,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
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
      const searchResults = await db.getItemSearch(newQuerySearch);
      return res.render("items", {
        items: searchResults,
        title: "Items",
        isItems: true,
      });

      // Case for individual string query
    } else {
      const searchResult = await db.getItemSearch(toTitleCase(querySearch));
      res.render("items", {
        items: searchResult,
        title: "Items",
        isItems: true,
      });
    }
  }),
];

// GET CREATE: Render the items view with the dialog containing
// the form open to allow entering new message
exports.getNewItem = asyncHandler(async (req, res) => {
  const items = await db.getItems();
  const categories = await db.getCategories();
  res.render("items", {
    items: items,
    categories: categories,
    openNewForm: true,
    isItems: true,
  });
});

// POST CREATE: Validate and post in db new message
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
        openNewForm: true,
        newItemError: errors.array(),
        isItems: true,
      });
      return;
    }
    const newItem = req.body;
    await db.postNewItem(newItem);
    res.redirect("/items");
  }),
];

// GET UPDATE: Render the items page and open a dialog
// form for updating a message
exports.getEditItem = asyncHandler(async (req, res) => {
  const items = await db.getItems();
  const categories = await db.getCategories();

  const itemId = Number(req.params.itemId);
  const itemToEdit = await db.getItem(itemId);
  res.render("items", {
    items: items,
    categories: categories,
    itemToEdit: itemToEdit[0],
    openEditForm: true,
    isItems: true,
  });
});

// POST UPDATE
exports.postEditItem = [
  itemValidation,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    const itemId = Number(req.params.itemId);
    if (!errors.isEmpty()) {
      const items = await db.getItems();
      const categories = await db.getCategories();
      const itemToEdit = await db.getItem(itemId);
      res.render("items", {
        items: items,
        categories: categories,
        itemToEdit: itemToEdit[0],
        openEditForm: true,
        isItems: true,
        editItemErrors: errors.array(),
      });
      return;
    }
    const newItemData = req.body;
    await db.postEditItem(newItemData, itemId);
    res.redirect("/items");
  }),
];

// GET DELETE: Render a warning dialog with item name
// for confirmation
exports.getDeleteItem = asyncHandler(async (req, res) => {
  // Get the item to delete
  const itemId = Number(req.params.itemId);
  const itemToDelete = await db.getItem(itemId);
  const items = await db.getItems();
  const categories = await db.getCategories();

  // Render the items view with delete confirmation dialog
  res.render("items", {
    items: items,
    categories: categories,
    itemToDelete: itemToDelete[0],
    isItems: true,
    openDeleteDialog: true,
  });
});

// POST DELETE
exports.postDeleteItem = asyncHandler(async (req, res) => {
  const itemToDelete = Number(req.params.itemId);
  await db.deleteItem(itemToDelete);
  res.redirect("/items");
});
