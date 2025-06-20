const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use("/", require("./routes/weather"));

const start = async () => {
  try {
    app.listen(port, () => console.log(`App listening on port ${port}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
