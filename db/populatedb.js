const { Client } = require("pg");

const SQL = `
CREATE TABLE category (
  category_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category_name VARCHAR(255) NOT NULL,
  custom BOOL NOT NULL
);

CREATE TABLE item (
  item_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category_id INT,
  item_name VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  quantity INT,
  value INT NOT NULL,
  is_favorite BOOL NOT NULL,
  FOREIGN KEY (category_id) REFERENCES category (category_id)
);

INSERT INTO category (category_name, custom)
VALUES ('Weapon', false), ('Armor', false), ('Potions', false);

INSERT INTO item (category_id, item_name, description, quantity, value, is_favorite)
VALUES 
(2, 'Chestplate of Truth', 'This armor will prevent lies', 3, 10000, true),
(2, 'Shield of Justice', 'One with sufficient righteous levels will unlock hidder powers', 1, 15000, true),
(1, 'Axe of Despair', 'Axe made with the One who Despairs' , 3, 10000, true),
(1, 'Penetrating Sword', NULL, 1, 5000, false),
(2, 'Knight Boots', NULL, 2, 3000, false),
(3, 'Potion of Healing', 'Restores 20hp', 10, 500, false),
(3, 'Potion of Healing II', 'Restores 50hp', 15, 1000, true),
(3, 'Potion of Valor', 'Increases damage', 6, 5000, false);
`;

const REVERT_SQL = `
  DROP TABLE item;
  DROP TABLE category;
`;

const main = async () => {
  console.log("populating database...");
  const client = new Client({
    host: process.env.HOSTNAME,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("finished!");
};

main();
