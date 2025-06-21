import { useState } from "react";
import { API_URL } from "../utils/api";
import type { Weather } from "../models/weather";

export default function Weather() {
  const [city, setCity] = useState<string>("");
  const [cityData, setCityData] = useState<Weather | null>(null);

  const iconMapping: Record<string, string> = {
    "01d": "wi-day-sunny",
    "01n": "wi-night-clear",
    "02d": "wi-day-cloudy",
    "02n": "wi-night-alt-cloudy",
    "03d": "wi-cloud",
    "03n": "wi-cloud",
    "04d": "wi-cloudy",
    "04n": "wi-cloudy",
    "09d": "wi-showers",
    "09n": "wi-showers",
    "10d": "wi-day-rain",
    "10n": "wi-night-alt-rain",
    "11d": "wi-thunderstorm",
    "11n": "wi-thunderstorm",
    "13d": "wi-snow",
    "13n": "wi-snow",
    "50d": "wi-fog",
    "50n": "wi-fog",
  };

  const iconCode = cityData?.weather[0].icon;
  const iconClass = iconCode ? iconMapping[iconCode] : "";

  const fetchWeather = async (city: string) => {
    if (!city) return;

    try {
      const response = await fetch(`${API_URL}/?city=${city}`);
      const data = await response.json();
      console.log(data);
      setCityData(data);
    } catch (error) {
      console.error("Error fetching weather", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    fetchWeather(city);
  };

  return (
    <>
      <input
        type="text"
        value={city}
        placeholder="type city name here"
        onChange={handleChange}
      />
      <button
        className="border border-black cursor-pointer"
        onClick={handleSearch}
      >
        Search
      </button>
      {cityData ? (
        <div>
          <h1>{cityData.name}</h1>
          <p>{Math.round(cityData.main.temp)}</p>
          <p>{cityData.weather[0].description}</p>
          <i className={`wi ${iconClass}`}></i>
        </div>
      ) : null}
    </>
  );
}
