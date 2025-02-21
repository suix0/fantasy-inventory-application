const pool = require("./pool");

exports.getItems = async () => {
  const { rows } = await pool.query("SELECT * FROM item;");
  return rows;
};

exports.getCategories = async () => {
  const { rows } = await pool.query("SELECT * FROM category;");
  return rows;
};

exports.getWeapons = async () => {
  const { rows } = await pool.query(`
    SELECT * FROM item 
    INNER JOIN category 
    ON item.category_id = category.id
    WHERE category.name = 'Weapon';`);
  return rows;
};
