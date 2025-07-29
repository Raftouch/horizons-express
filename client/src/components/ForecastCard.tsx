import { useTranslation } from "react-i18next";
import type { ForecastItem } from "../models/forecast";
import { weatherMainTranslationsMapping } from "../utils/mappings/description";
import { iconMapping } from "../utils/mappings/icon";

interface ForecastCardProps {
  forecast: ForecastItem;
}

export default function ForecastCard({ forecast }: ForecastCardProps) {
  const iconCode = forecast.weather[0].icon;
  const iconClass = iconCode ? iconMapping[iconCode] : "";

  const date = new Date(forecast.dt_txt.slice(0, 10));
  const { i18n } = useTranslation();

  const lang = i18n.language;

  const forecastDescription =
    weatherMainTranslationsMapping[forecast.weather[0].main];

  const descriptionTranslated =
    forecastDescription?.[lang as "en-US" | "fr-FR" | "ru-RU"] ??
    forecast?.weather[0].main;

  return (
    <li
      className="flex flex-col items-center bg-white text-slate-900 rounded-md min-w-[130px] py-2"
      key={forecast.dt}
    >
      <div className="flex gap-2 items-center">
        <p>{date.toLocaleDateString().slice(0, 5)}</p>
        <p className="border px-1 rounded-md bg-gray-100">
          {forecast.dt_txt.slice(11, 16)}
        </p>
      </div>
      <p className="italic text-gray-600">{descriptionTranslated}</p>
      <i className={`wi ${iconClass} text-4xl my-2`}></i>
      <p className="text-xl font-semibold mb-1">
        {Math.round(forecast.main.temp)}°
      </p>
    </li>
  );
}
