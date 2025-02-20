const pool = require("./pool");

const getItems = async () => {
  const { rows } = await pool.query("SELECT * FROM item;");
  return rows;
};
