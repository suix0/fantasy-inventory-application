const db = require("../db/query");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const validateCategoryName = [
  body("categoryName")
    .trim()
    .notEmpty()
    .withMessage("Category name can't be empty!")
    .isLength({ max: 25 })
    .withMessage("Category name has a maximum of 25 characters only"),
];

// READ: Get all categories
exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await db.getCategories();
  res.render("categories", { title: "Categories", categories: categories });
});

// READ: Read items depending on clicked category
exports.getCategoryItems = asyncHandler(async (req, res) => {
  const categoryId = Number(req.params.categoryId);
  const categories = await db.getCategories();
  const items = await db.getCategoryItems(categoryId);
  res.render("categories", {
    title: "Categories",
    categories: categories,
    items: items,
  });
});

// CREATE: Post a new category
exports.postNewCategory = [
  validateCategoryName,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const categories = await db.getCategories();
      res.render("categories", {
        title: "Categories",
        categories: categories,
        categoryNameErrors: errors.array(),
        openForm: true,
      });
      return;
    }
    const newCategory = req.body.categoryName;
    await db.postNewCategory(newCategory);
    res.redirect("/categories");
  }),
];

// DELETE: Delete a category
exports.postDeleteCategory = asyncHandler(async (req, res) => {
  const categoryId = Number(req.params.categoryId);

  // Prevent force deletion of main categories (weapon, armor, potion)
  if (categoryId >= 1 && categoryId <= 3) {
    res.redirect("/categories");
    return;
  }
  // Delete items belonging to category
  await db.deleteCategoryItems(categoryId);
  // Delete the category
  await db.deleteCategory(categoryId);
  res.redirect("/categories");
});

// UPDATE: Update a category name
exports.postEditCategory = [
  validateCategoryName,
  asyncHandler(async (req, res) => {
    const categoryId = Number(req.params.categoryId);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const categories = await db.getCategories();
      res.render("categories", {
        title: "Categories",
        categories: categories,
        categoryNameErrors: errors.array(),
        openEditForm: true,
      });
      return;
    }
    if (categoryId >= 1 && categoryId <= 3) {
      res.redirect("/categories");
      return;
    }
    const newCategoryName = req.body.categoryName;
    await db.postEditCategory(categoryId, newCategoryName);
    res.redirect("/categories");
  }),
];
