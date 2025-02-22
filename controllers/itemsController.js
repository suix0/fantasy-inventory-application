const db = require("../db/query");
const asyncHandler = require("express-async-handler");
const { query, validationResult } = require("express-validator");
const { toTitleCase } = require("../utils/strings");

const queryValidation = [
  query("search")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Search can't be empty")
    .toLowerCase(),
];

exports.getAllItems = asyncHandler(async (req, res) => {
  const items = await db.getItems();
  res.render("items", { items: items });
});

exports.getItem = [
  queryValidation,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("not empty");
      const items = await db.getItems();
      return res.render("items", { items: items, errors: errors.array() });
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
      return res.render("items", { items: searchResults });

      // Case for individual string query
    } else {
      const searchResult = await db.getItem(toTitleCase(querySearch));
      res.render("items", { items: searchResult });
    }
  }),
];
