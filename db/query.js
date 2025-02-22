const pool = require("./pool");

exports.getItems = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM item INNER JOIN category ON item.category_id = category.category_id;"
  );
  return rows;
};

exports.getItem = async (name) => {
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
