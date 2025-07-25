const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://horizons-express.netlify.app"],
  })
);
app.use("/", require("./routes/weather"));
app.use("/weekly-forecast", require("./routes/weekly-forecast"));

const start = async () => {
  try {
    app.listen(port, () => console.log(`App listening on port ${port}`));
  } catch (error) {
    console.error("Failed to start server", error.message);
    process.exit(1);
  }
};

start();
