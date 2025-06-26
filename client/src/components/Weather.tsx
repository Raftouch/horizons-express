import { useState } from "react";
import { API_URL } from "../utils/api";
import type { Weather } from "../models/weather";
import { FaSearch } from "react-icons/fa";
import Favorite from "./Favorite";
import WeatherCard from "./WeatherCard";

export default function Weather() {
  const [city, setCity] = useState<string>("");
  const [cityData, setCityData] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city: string) => {
    if (!city) return;

    try {
      setError(null);
      const response = await fetch(`${API_URL}/?city=${city}`);
      console.log("res : ", response);
      const data = await response.json();
      console.log("data : ", data);

      if (data.cod === "404") {
        setCityData(null);
        setError(data.message);
      } else {
        setCityData(data);
      }
    } catch (error) {
      setCityData(null);
      setError("An error occured while fetching data");
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
      <div className="flex flex-col items-center">
        <div className="flex gap-5 my-5 text-white pb-5 w-[364px]">
          <input
            type="text"
            value={city}
            placeholder="type city name here"
            onChange={handleChange}
            className="flex-1 border border-slate-400 px-2 py-1 rounded-full"
          />
          <button
            className="border border-slate-400 cursor-pointer px-2 py-1 rounded-full hover:bg-slate-800"
            onClick={handleSearch}
          >
            <FaSearch />
          </button>
        </div>

        {error ? <div className="text-red-500">{error}</div> : null}

        {cityData ? (
          <WeatherCard key={cityData.id} cityWeather={cityData} />
        ) : null}
      </div>

      <Favorite />
    </div>
  );
}
