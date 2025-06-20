const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const apiKey = process.env.API_KEY;
  const city = "paris";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
