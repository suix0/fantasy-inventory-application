const db = require("../db/query");
const asyncHandler = require("express-async-handler");
const { query, body, validationResult } = require("express-validator");
const { toTitleCase } = require("../utils/strings");
const custom404 = require("../errors/404");

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

  if (!items) {
    throw new custom404("Items not found.");
  }

  res.render("items", { items: items, title: "Items", isItems: true });
});

// GET SEARCH: Render an item that matches every word in search field
exports.getItem = [
  queryValidation,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const items = await db.getItems();

      if (!items) {
        throw new custom404("Items not found.");
      }

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

      if (!searchResults) {
        throw new custom404("Search result not found.");
      }

      return res.render("items", {
        items: searchResults,
        title: "Items",
        isItems: true,
      });

      // Case for individual string query
    } else {
      const searchResult = await db.getItemSearch(toTitleCase(querySearch));

      if (!searchResult) {
        throw new custom404("Search result not found.");
      }

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

  if (!items || !categories) {
    throw new custom404("Items/Categories not found.");
  }

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

      if (!items || !categories) {
        throw new custom404("Items/Categories not found.");
      }

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

  if (!items || !categories) {
    throw new custom404("Items/Categories not found!");
  }

  const itemId = Number(req.params.itemId);
  const itemToEdit = await db.getItem(itemId);

  if (!itemToEdit) {
    throw new custom404("Item to edit not found.");
  }
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

      if (!items || !categories) {
        throw new custom404("Items/Categories not found!");
      }

      const itemToEdit = await db.getItem(itemId);

      if (!itemToEdit) {
        throw new custom404("Item to edit not found.");
      }

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

  if (itemToDelete.length === 0) {
    throw new custom404("Item to delete not found.");
  }

  const items = await db.getItems();
  const categories = await db.getCategories();

  if (!items || !categories) {
    throw new custom404("Items/Categories not found!");
  }

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

// GET SORT: Sort items
exports.getSortItem = asyncHandler(async (req, res) => {
  const sortBy = req.query.sort;

  let items;
  switch (sortBy) {
    case "alpha":
      items = await db.getItemsAlphabetically();
      break;
    case "valueAsc":
      items = await db.getItemsAscendingValue();
      break;
    case "valueDesc":
      items = await db.getItemsDescendingValue();
      break;
    default:
      throw new custom404("Please sort only with the options given.");
  }

  res.render("items", {
    items: items,
    title: "Items",
    isItems: true,
  });
});
