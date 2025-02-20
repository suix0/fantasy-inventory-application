const { Client } = require("pg");

const SQL = `
CREATE TABLE category (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE item (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category_id INT,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  quantity INT,
  value INT NOT NULL,
  is_favorite BOOL NOT NULL,
  FOREIGN KEY (category_id) REFERENCES category (id)
);

INSERT INTO category (name)
VALUES ('Weapon'), ('Armor'), ('Potions');

`;
