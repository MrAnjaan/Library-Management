const express = require("express");
const expressLayout = require('express-ejs-layouts');
const app = express();
const cookieParser = require('cookie-parser');
const ConnectDB = require("./config/db");
require('dotenv').config();

//connecting Database
ConnectDB();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

//Routes
const bookRoutes = require("./routes/bookRoutes");
const authorRoutes = require("./routes/authorRoutes");

app.use("/", require('./routes/userRoutes'));
app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}.`);
});
