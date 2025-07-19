const express = require("express");
const { getWeeklyForecast } = require("../controllers/weekly-forecast");
const router = express.Router();

router.get("/", getWeeklyForecast);

module.exports = router;
