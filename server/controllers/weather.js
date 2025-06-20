const getWeather = async (req, res) => {
  const apiKey = process.env.API_KEY;
  const city = req.query.city;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getWeather };
