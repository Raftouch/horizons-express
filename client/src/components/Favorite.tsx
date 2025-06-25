import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import WeatherCard from "./Weathercard";

export default function Favorite() {
  const cities = useSelector((state: RootState) => state.cities.weather);

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 xl:grid-cols-3 xl:gap-24">
      {cities.map((city) => (
        <WeatherCard key={city.id} cityWeather={city} />
      ))}
    </div>
  );
}
