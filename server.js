const express = require("express");
const app = express();
const routes = require("./routes");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use("/api", routes);

const url = process.env.DB_CONNECTION_URL;
console.log(url);
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected !!");
  })
  .catch(() => {
    console.log(err.message);
  });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
