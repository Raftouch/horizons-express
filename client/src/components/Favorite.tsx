import { useDispatch, useSelector } from "react-redux";
import type { AddDispatch, RootState } from "../store/store";
import WeatherCard from "./WeatherCard";
import { useEffect } from "react";
import {
  clearSelectedCityWeather,
  fetchWeatherForFavorites,
} from "../store/weather-slice";
import { useTranslation } from "react-i18next";

export default function Favorite() {
  const allWeather = useSelector((state: RootState) => state.cities.weather);
  const favorites = useSelector((state: RootState) => state.cities.favorites);

  const { t } = useTranslation();

  const favorieCitiesWeather = allWeather.filter((city) =>
    favorites.includes(city.name)
  );

  const dispatch = useDispatch<AddDispatch>();

  useEffect(() => {
    dispatch(clearSelectedCityWeather());
    favorites.forEach((city) => {
      dispatch(fetchWeatherForFavorites(city));
    });
  }, [favorites, dispatch]);

  return (
    <div className="">
      <h2 className="text-white text-center text-xl my-10">{t("favCities")}</h2>
      {favorieCitiesWeather.length > 0 ? (
        <div className="max-w-[400px] md:max-w-[768px] xl:max-w-[1280px] m-auto px-10">
          <div className="overflow-x-auto flex gap-10 xl:gap-20 flex-nowrap pb-4 scroll-smooth">
            {favorieCitiesWeather.map((city) => (
              <WeatherCard key={city.id} cityWeather={city} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-slate-400">No cities in your list yet...</div>
      )}
    </div>
  );
}
