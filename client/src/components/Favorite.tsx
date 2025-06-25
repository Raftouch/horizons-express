import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import WeatherCard from "./Weathercard";

export default function Favorite() {
  const cities = useSelector((state: RootState) => state.cities.weather);

  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cities.map((city) => (
        <WeatherCard key={city.id} cityWeather={city} />
      ))}
    </div>
  );
}
