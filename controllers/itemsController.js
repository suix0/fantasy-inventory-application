const db = require("../db/query");
const asyncHandler = require("express-async-handler");

exports.getAllItems = asyncHandler(async (req, res) => {
  const items = await db.getItems();
  res.render("items", { items: items });
});
