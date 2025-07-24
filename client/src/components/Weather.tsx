import { useState } from "react";
import type { Weather } from "../models/weather";
import WeatherCard from "./WeatherCard";
import { useDispatch, useSelector } from "react-redux";
import type { AddDispatch, RootState } from "../store/store";
import { fetchWeatherForSelectedCity } from "../store/weather-slice";
import { useTranslation } from "react-i18next";
import Search from "./Search";

export default function Weather() {
  const [city, setCity] = useState<string>("");

  const { t } = useTranslation();

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

  if (isLoading)
    return <div className="text-center text-white">{t("actions.loading")}</div>;

  return (
    <div className="flex flex-col items-center">
      <Search
        city={city}
        handleCityChange={handleChange}
        handleCitySearch={handleSearch}
      />

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
