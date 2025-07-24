import type { ForecastItem } from "../models/forecast";

interface ForecastCardProps {
  forecast: ForecastItem;
}

export default function ForecastCard({ forecast }: ForecastCardProps) {
  return (
    <li className="border bg-white text-slate-900 rounded-md" key={forecast.dt}>
      <p>{forecast.dt_txt}</p>
      <p>ICON {forecast.weather[0].icon}</p>
      <p>{Math.round(forecast.main.temp)}°</p>
    </li>
  );
}
