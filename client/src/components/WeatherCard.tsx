import type { Weather } from "../models/weather";
import { iconMapping } from "../utils/mappings/icon";
import { formatTime } from "../utils/format";
import { useDispatch, useSelector } from "react-redux";
import type { AddDispatch, RootState } from "../store/store";
import { addFavorite, removeFavorite } from "../store/weather-slice";
import { useTranslation } from "react-i18next";

interface CityWeatherProps {
  cityWeather: Weather;
}

export default function WeatherCard({ cityWeather }: CityWeatherProps) {
  const iconCode = cityWeather?.weather[0].icon;
  const iconClass = iconCode ? iconMapping[iconCode] : "";

  const { t, i18n } = useTranslation();

  i18n.on("languageChanged", (lng) => {
    console.log("Detected language:", lng);
  });

  const sunrise = cityWeather?.sys?.sunrise
    ? formatTime(cityWeather.sys.sunrise, cityWeather.timezone)
    : null;

  const sunset = cityWeather?.sys?.sunset
    ? formatTime(cityWeather.sys.sunset, cityWeather.timezone)
    : null;

  // to convert from meters per second into km/h
  const windSpeed = cityWeather?.wind?.speed
    ? Math.round(cityWeather.wind.speed * 3.6)
    : null;

  const dispatch = useDispatch<AddDispatch>();

  const handleAdd = () => {
    dispatch(addFavorite(cityWeather.name));
  };

  const handleRemove = () => {
    dispatch(removeFavorite(cityWeather.name));
  };

  // const isFavorite = useSelector((state: RootState) =>
  //   state.cities.weather.some((city) => city.id === cityWeather.id)
  // );
  const isFavorite = useSelector((state: RootState) =>
    state.cities.favorites.includes(cityWeather.name)
  );

  return (
    <div className="flex flex-shrink-0 flex-col w-[360px] p-8 bg-slate-100 rounded rounded-xl items-center">
      <div className="text-center pb-4">
        <h1 className="text-2xl font-bold">
          {cityWeather.name}, {cityWeather.sys.country}
        </h1>
        <i className={`wi ${iconClass} text-6xl my-2`}></i>
        <p className="text-3xl font-semibold mb-1">
          {Math.round(cityWeather.main.temp)}°
        </p>
        <p className="italic text-gray-600">
          {cityWeather.weather[0].description}
        </p>
      </div>

      <div className="flex gap-5 items-center justify-center border-t border-slate-400 w-full py-4">
        <i className="wi wi-thermometer text-4xl text-sky-600"></i>
        <div className="space-y-1 text-sm">
          <div className="flex gap-5">
            <div>
              <p>
                {t("weather.max")}: {Math.round(cityWeather.main.temp_max)}°
              </p>
              <p>
                {t("weather.min")}: {Math.round(cityWeather.main.temp_min)}°
              </p>
            </div>
            <div>
              <p>
                {t("weather.feelsLike")}:{" "}
                {Math.round(cityWeather.main.feels_like)}°
              </p>
              <p>
                {t("weather.humidity")}: {cityWeather.main.humidity}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-5 text-sm border-t border-slate-400 w-full pt-4">
        <div className="flex flex-col">
          <i className="wi wi-horizon-alt text-3xl text-orange-500"></i>
          <i className="wi wi-horizon text-3xl text-red-500"></i>
          <i className="wi wi-strong-wind text-3xl text-sky-800"></i>
        </div>
        <div className="flex flex-col gap-2">
          <p>
            {t("weather.sunrise")}: {sunrise}
          </p>
          <p>
            {t("weather.sunset")}: {sunset}
          </p>
          <p>
            {t("weather.wind")}: {windSpeed} {t("weather.kmH")}
          </p>
        </div>
        <div className="flex items-center gap-5"></div>
      </div>
      {!isFavorite ? (
        <button
          onClick={handleAdd}
          className={`mt-6 text-white w-full px-2 py-1 rounded-full cursor-pointer bg-green-600 hover:bg-green-700 ${
            !cityWeather ? "opacity-50 cursos-not-allowed" : ""
          }`}
        >
          {t("actions.addToList")}
        </button>
      ) : (
        <button
          onClick={handleRemove}
          className={`mt-6 text-white w-full px-2 py-1 rounded-full cursor-pointer bg-red-600 hover:bg-red-700 ${
            !cityWeather ? "opacity-50 cursos-not-allowed" : ""
          }`}
        >
          {t("actions.removeFromList")}
        </button>
      )}
    </div>
  );
}
