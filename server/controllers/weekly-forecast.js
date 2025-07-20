const getWeeklyForecast = async (req, res) => {
  const apiKey = process.env.API_KEY;
  const city = req.query.city;
  const lat = "48.8566";
  const lon = "2.3522";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error("Failed to fetch weather forecast", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { getWeeklyForecast };
