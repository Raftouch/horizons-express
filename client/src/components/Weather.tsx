import { useState } from "react";
import { API_URL } from "../utils/api";
import type { Weather } from "../models/weather";

export default function Weather() {
  const [city, setCity] = useState("");
  const [cityData, setCityData] = useState<Weather | null>(null);

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
        </div>
      ) : null}
    </>
  );
}
