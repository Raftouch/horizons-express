import type { ForecastItem } from "../models/forecast";
import { iconMapping } from "../utils/mappings/icon";

interface ForecastCardProps {
  forecast: ForecastItem;
}

export default function ForecastCard({ forecast }: ForecastCardProps) {
  const iconCode = forecast.weather[0].icon;
  const iconClass = iconCode ? iconMapping[iconCode] : "";
  const date = new Date(forecast.dt_txt);

  return (
    <li
      className="flex flex-col items-center border bg-white text-slate-900 rounded-md min-w-[130px] py-2"
      key={forecast.dt}
    >
      <p>{date.toLocaleDateString().slice(0, 5)}</p>
      <p>{forecast.dt_txt.slice(11, 16)}</p>
      <p>{forecast.weather[0].main}</p>
      <i className={`wi ${iconClass} text-4xl my-2`}></i>
      <p>{Math.round(forecast.main.temp)}°</p>
    </li>
  );
}
