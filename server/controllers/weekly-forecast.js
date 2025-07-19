const getWeeklyForecast = async (req, res) => {
  const apiKey = process.env.API_KEY;
  const city = req.query.city;
  const lat = "48.8566";
  const lon = "2.3522";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("DATA : ", data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getWeeklyForecast };
