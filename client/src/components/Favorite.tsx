import { useDispatch, useSelector } from "react-redux";
import type { AddDispatch, RootState } from "../store/store";
import WeatherCard from "./WeatherCard";
import { useEffect } from "react";
import { fetchWeather } from "../store/weather-slice";

export default function Favorite() {
  const allWeather = useSelector((state: RootState) => state.cities.weather);
  const favorites = useSelector((state: RootState) => state.cities.favorites);

  const favorieCitiesWeather = allWeather.filter((city) =>
    favorites.includes(city.name)
  );

  const dispatch = useDispatch<AddDispatch>();

  useEffect(() => {
    favorites.forEach((city) => {
      dispatch(fetchWeather(city));
    });
  }, [favorites, dispatch]);

  return (
    <div className="mt-5">
      <h2 className="text-white text-center text-xl my-10">Favorite Cities</h2>
      {favorieCitiesWeather.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 xl:grid-cols-3 xl:gap-24 place-items-center">
          {favorieCitiesWeather.map((city) => (
            <WeatherCard key={city.id} cityWeather={city} />
          ))}
        </div>
      ) : (
        <div className="text-slate-400">No cities in your list yet...</div>
      )}
    </div>
  );
}
