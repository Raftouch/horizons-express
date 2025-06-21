import { useState } from "react";
import { API_URL } from "../utils/api";
import type { Weather } from "../models/weather";
import { iconMapping } from "../utils/icon-mapping";
import { formatTime } from "../utils/format";

export default function Weather() {
  const [city, setCity] = useState<string>("");
  const [cityData, setCityData] = useState<Weather | null>(null);

  const iconCode = cityData?.weather[0].icon;
  const iconClass = iconCode ? iconMapping[iconCode] : "";

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
    <div className="font-mono">
      <div className="flex gap-2 my-5">
        <input
          type="text"
          value={city}
          placeholder="type city name here"
          onChange={handleChange}
          className="border border-slate-400 px-2 py-1 rounded-l-full"
        />
        <button
          className="border border-slate-400 cursor-pointer px-2 py-1 rounded-r-full hover:bg-slate-200"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {cityData ? (
        <div>
          <h1 className="text-2xl font-bold mb-2">
            {cityData.name}, {cityData.sys.country}
          </h1>
          <i className={`wi ${iconClass} text-6xl my-4 text-teal-500`}></i>
          <p className="text-3xl font-semibold mb-1">
            {Math.round(cityData.main.temp)}°C
          </p>

          <p className="italic text-gray-600 mb-4">
            {cityData.weather[0].description}
          </p>

          <div className="border-t border-gray-200 my-4"></div>

          <div className="space-y-1 text-sm">
            <p>Feels like : {Math.round(cityData.main.feels_like)}°C</p>
            <p>Humidity : {cityData.main.humidity}%</p>
            <p>Max : {Math.round(cityData.main.temp_max)}°C</p>
            <p>Min : {Math.round(cityData.main.temp_min)}°C</p>
          </div>

          <div className="border-t border-gray-200 my-4"></div>

          <div className="space-y-5 text-sm">
            <div className="flex items-center gap-5">
              <i className="wi wi-horizon-alt text-3xl text-cyan-500"></i>
              <p>{sunrise}</p>
            </div>
            <div className="flex items-center gap-5">
              <i className="wi wi-horizon text-3xl text-cyan-500"></i>
              <p>{sunset}</p>
            </div>
            {/* <p>Wind speed : {cityData.wind.speed}</p> */}
          </div>
        </div>
      ) : null}
    </div>
  );
}
