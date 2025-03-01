const express = require("express");
const app = express();
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const itemsRouter = require("./routes/itemsRouter");
const categoriesRouter = require("./routes/categoriesRouter");
require("dotenv").config();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/items", itemsRouter);
app.use("/categories", categoriesRouter);

app.use((req, res, next) => {
  res.render("errorPage");
});

app.use((err, req, res, next) => {
  res
    .status(err.statusCode || 500)
    .render("errorPage", { errCode: err.statusCode, message: err.message });
});
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is listening at port ${PORT}`));
