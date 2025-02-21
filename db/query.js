const pool = require("./pool");

exports.getItems = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM item INNER JOIN category ON item.category_id = category.category_id;"
  );
  console.log(rows);
  return rows;
};

exports.getCategories = async () => {
  const { rows } = await pool.query("SELECT * FROM category;");
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
