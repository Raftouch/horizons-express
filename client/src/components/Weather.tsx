import { useState } from "react";
import { API_URL } from "../utils/api";
import type { Weather } from "../models/weather";
import { iconMapping } from "../utils/icon-mapping";

export default function Weather() {
  const [city, setCity] = useState<string>("");
  const [cityData, setCityData] = useState<Weather | null>(null);

  const iconCode = cityData?.weather[0].icon;
  const iconClass = iconCode ? iconMapping[iconCode] : "";

  const formatTime = (date: Date): string =>
    date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  const sunrise = cityData?.sys?.sunrise
    ? formatTime(new Date(cityData?.sys.sunrise * 1000))
    : null;

  const sunset = cityData?.sys?.sunset
    ? formatTime(new Date(cityData?.sys.sunset * 1000))
    : null;

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
          <h1>City name : {cityData.name}</h1>
          <p>temperature : {Math.round(cityData.main.temp)}</p>
          <i className={`wi ${iconClass}`}></i>

          <p>Description : {cityData.weather[0].description}</p>
          <p>Feels like : {Math.round(cityData.main.feels_like)}</p>
          <p>Humidity : {cityData.main.humidity}</p>
          <p>Max : {Math.round(cityData.main.temp_max)}</p>
          <p>Min : {Math.round(cityData.main.temp_min)}</p>

          <p>Country : {cityData.sys.country}</p>
          <p>Sunrise : {sunrise}</p>
          <p>Sunset : {sunset}</p>

          <p>Wind speed : {cityData.wind.speed}</p>
        </div>
      ) : null}
    </>
  );
}
