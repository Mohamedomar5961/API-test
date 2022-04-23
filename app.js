const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

app.use(bodyParser.json());
app.use(cors());

//Import routes
const postsRoute = require("./routes/posts");
const favoritesRoute = require("./routes/favorites");
const cartRoute = require("./routes/cart");

//middleware
app.use("/", postsRoute);
app.use("/favorites", favoritesRoute);
app.use("/cart", cartRoute);

//ROUTES

//connect to DB
mongoose.connect(process.env.DB_CONNECTION, () =>
  console.log("connected to DB")
);

//How to we start listening for the server?
app.listen(3000);
