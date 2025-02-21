const express = require("express");
const app = express();
const path = require("node:path");
const indexRoute = require("./routes/indexRouter");

require("dotenv").config();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is listening at port ${PORT}`));
