import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import WeatherCard from "./WeatherCard";

export default function Favorite() {
  const cities = useSelector((state: RootState) => state.cities.weather);

  return (
    <div className="mt-5">
      <h1 className="text-white text-center text-2xl my-10">Favorite Cities</h1>
      {cities.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 xl:grid-cols-3 xl:gap-24">
          {cities.map((city) => (
            <WeatherCard key={city.id} cityWeather={city} />
          ))}
        </div>
      ) : (
        <div className="text-slate-400">No cities in your list yet...</div>
      )}
    </div>
  );
}
