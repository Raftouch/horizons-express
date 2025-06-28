import { useState } from "react";
import type { Weather } from "../models/weather";
import { FaSearch } from "react-icons/fa";
import Favorite from "./Favorite";
import WeatherCard from "./WeatherCard";
import { useDispatch, useSelector } from "react-redux";
import type { AddDispatch, RootState } from "../store/store";
import { fetchWeather } from "../store/weather-slice";

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
    dispatch(fetchWeather(city));
  };

  if (isLoading) return <div className="text-center">Loading...</div>;

  return (
    <>
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

        {selectedCityWeather ? (
          <WeatherCard
            key={selectedCityWeather.id}
            cityWeather={selectedCityWeather}
          />
        ) : null}
      </div>

      <Favorite />
    </>
  );
}
