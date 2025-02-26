const { param } = require("express-validator");
const pool = require("./pool");

exports.getItems = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM item INNER JOIN category ON item.category_id = category.category_id;"
  );
  return rows;
};

// Search
exports.getItemSearch = async (name) => {
  if (Array.isArray(name)) {
    let likeQuery = "";
    let parameters = [];
    let i = 1;
    name.forEach((names) => {
      if (i === name.length) {
        likeQuery += "item.item_name LIKE $" + i + " ";
      } else {
        likeQuery += "item.item_name LIKE $" + i + " OR ";
      }
      i++;
      parameters.push(`%${names}%`);
    });
    const { rows } = await pool.query(
      `
      SELECT * FROM item 
      INNER JOIN category ON item.category_id = category.category_id
      WHERE ${likeQuery}
    `,
      parameters
    );
    return rows;
  } else {
    const { rows } = await pool.query(
      `
      SELECT * FROM item 
      INNER JOIN category ON item.category_id = category.category_id
      WHERE item.item_name LIKE $1 OR item.item_name LIKE $2 OR item.item_name LIKE $3;
      `,
      [`%${name}%`, `%${name.toLowerCase()}%`, `%${name.toUpperCase()}%`]
    );
    return rows;
  }
};

exports.getItem = async (messageId) => {
  const { rows } = await pool.query(
    `
    SELECT * FROM item 
    INNER JOIN category ON item.category_id = category.category_id
    WHERE item.item_id = $1;
    `,
    [messageId]
  );
  return rows;
};

exports.getCategories = async () => {
  const { rows } = await pool.query("SELECT * FROM category;");
  return rows;
};

exports.getCategory = async (categoryId) => {
  const { rows } = await pool.query(
    `
    SELECT * FROM category
    WHERE category_id = $1
  `,
    [categoryId]
  );
  return rows;
};

exports.getWeapons = async () => {
  const { rows } = await pool.query(`
    SELECT * FROM item
    INNER JOIN category ON item.category_id = category.category_id
    WHERE category.category_name = 'Weapon';    
`);
  return rows;
};

exports.getArmors = async () => {
  const { rows } = await pool.query(`
    SELECT * FROM item
    INNER JOIN category ON item.category_id = category.category_id
    WHERE category.category_name = 'Armor';    
    `);
  return rows;
};

exports.getPotions = async () => {
  const { rows } = await pool.query(`
    SELECT * FROM item
    INNER JOIN category ON item.category_id = category.category_id
    WHERE category.category_name = 'Potions';    
    `);
  return rows;
};

exports.postNewItem = async (newItem) => {
  const query = `
  INSERT INTO item (item_name, description, category_id, quantity, value, is_favorite)
  VALUES ($1, $2, $3, $4, $5, $6);
  `;
  const paramArr = [
    newItem.itemName,
    newItem.itemDesc,
    Number(newItem.categories),
    Number(newItem.itemQuantity),
    Number(newItem.itemValue),
    Boolean(newItem.isFavorite),
  ];
  await pool.query(query, paramArr);
};

exports.postEditItem = async (editItem, itemId) => {
  const query = `
  UPDATE item
  SET item_name = $1, description = $2, category_id = $3, quantity = $4, value = $5, is_favorite = $6
  WHERE item.item_id = $7;
  `;
  const paramArr = [
    editItem.itemName,
    editItem.itemDesc,
    Number(editItem.categories),
    Number(editItem.itemQuantity),
    Number(editItem.itemValue),
    Boolean(editItem.isFavorite),
    itemId,
  ];
  await pool.query(query, paramArr);
};

exports.deleteItem = async (itemId) => {
  await pool.query(
    `
    DELETE FROM item
    WHERE item_id = $1
  `,
    [itemId]
  );
};

exports.getItemsAlphabetically = async () => {
  const { rows } = await pool.query(`
     SELECT * FROM item 
     INNER JOIN category ON item.category_id = category.category_id
     ORDER BY item.item_name;
  `);
  return rows;
};

exports.getItemsAscendingValue = async () => {
  const { rows } = await pool.query(`
    SELECT * FROM item 
     INNER JOIN category ON item.category_id = category.category_id
     ORDER BY item.value ASC;
  `);
  return rows;
};

exports.getItemsDescendingValue = async () => {
  const { rows } = await pool.query(`
    SELECT * FROM item 
     INNER JOIN category ON item.category_id = category.category_id
     ORDER BY item.value DESC;
  `);
  return rows;
};

exports.getCategories = async () => {
  const { rows } = await pool.query(`
    SELECT * FROM category;   
  `);
  return rows;
};

exports.getCategoryItems = async (categoryId) => {
  const { rows } = await pool.query(
    `
    SELECT * FROM item INNER JOIN category
    ON item.category_id = category.category_id
    WHERE item.category_id = $1;  
  `,
    [categoryId]
  );
  return rows;
};

exports.postNewCategory = async (categoryName) => {
  await pool.query(
    `
    INSERT INTO category (category_name, custom)
    VALUES ($1, true);
  `,
    [categoryName]
  );
};

exports.deleteCategoryItems = async (categoryId) => {
  await pool.query(
    `
    DELETE FROM item
    WHERE category_id = $1;
  `,
    [categoryId]
  );
};

exports.deleteCategory = async (categoryId) => {
  await pool.query(
    `
    DELETE FROM category
    WHERE category_id = $1;
  `,
    [categoryId]
  );
};
