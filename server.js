const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
app.use(express.json());
app.use("/", require("./roots/personRoutes"));

mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(process.env.PORT, (err) =>
  err ? console.log(err) : console.log(`server is running `)
);
