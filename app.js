const express = require("express");
const app = express();
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const itemsRouter = require("./routes/itemsRouter");
require("dotenv").config();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/items", itemsRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is listening at port ${PORT}`));
