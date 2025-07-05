import { useState } from "react";
import type { Weather } from "../models/weather";
import { FaSearch } from "react-icons/fa";
import WeatherCard from "./WeatherCard";
import { useDispatch, useSelector } from "react-redux";
import type { AddDispatch, RootState } from "../store/store";
import { fetchWeatherForSelectedCity } from "../store/weather-slice";

export default function Weather() {
  const [city, setCity] = useState<string>("");

  const { selectedCityWeather, isLoading, error } = useSelector(
    (state: RootState) => state.cities
  );

  const dispatch = useDispatch<AddDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    dispatch(fetchWeatherForSelectedCity(city));
  };

  if (isLoading) return <div className="text-center">Loading...</div>;

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-5 my-4 text-white pb-5 w-[320px]">
        <input
          type="text"
          value={city}
          placeholder="Search for a city"
          onChange={handleChange}
          className="outline-none focus:border-white flex-1 border border-white/50 px-4 py-1 rounded-full"
        />
        <button
          className="border border-white/50 cursor-pointer px-2 py-1 rounded-full hover:border-white"
          onClick={handleSearch}
        >
          <FaSearch />
        </button>
      </div>

      {error ? <div className="text-red-500">{error}</div> : null}

      {selectedCityWeather ? (
        <WeatherCard
          key={selectedCityWeather.id}
          cityWeather={selectedCityWeather}
        />
      ) : null}
    </div>
  );
}
