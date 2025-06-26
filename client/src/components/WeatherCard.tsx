import type { Weather } from "../models/weather";
import { iconMapping } from "../utils/mapping";
import { formatTime } from "../utils/format";
import { useDispatch } from "react-redux";
import type { AddDispatch } from "../store/store";
import { addWeather } from "../store/weather-slice";

interface CityWeatherProps {
  cityWeather: Weather;
  showAddButton: Boolean;
}

export default function WeatherCard({
  cityWeather,
  showAddButton = false,
}: CityWeatherProps) {
  const iconCode = cityWeather?.weather[0].icon;
  const iconClass = iconCode ? iconMapping[iconCode] : "";

  const sunrise = cityWeather?.sys?.sunrise
    ? formatTime(new Date(cityWeather?.sys.sunrise * 1000))
    : null;

  const sunset = cityWeather?.sys?.sunset
    ? formatTime(new Date(cityWeather?.sys.sunset * 1000))
    : null;

  // to convert from meters per second into km/h
  const windSpeed = cityWeather?.wind?.speed
    ? Math.round(cityWeather.wind.speed * 3.6)
    : null;

  const dispatch = useDispatch<AddDispatch>();

  const handleClick = () => {
    if (cityWeather) dispatch(addWeather(cityWeather));
  };

  return (
    <div className="flex flex-col w-[364px] p-8 bg-white rounded rounded-xl items-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">
          {cityWeather.name}, {cityWeather.sys.country}
        </h1>
        <i className={`wi ${iconClass} text-6xl my-4`}></i>
        <p className="text-3xl font-semibold mb-1">
          {Math.round(cityWeather.main.temp)}°
        </p>
        <p className="italic text-gray-600">
          {cityWeather.weather[0].description}
        </p>
      </div>

      <div className="border-t border-gray-200 my-4"></div>

      <div className="flex gap-5 items-center">
        <div className="">
          <i className="wi wi-thermometer text-4xl"></i>
        </div>
        <div className="space-y-1 text-sm">
          <p>Feels like : {Math.round(cityWeather.main.feels_like)}°</p>
          <p>Max : {Math.round(cityWeather.main.temp_max)}°</p>
          <p>Min : {Math.round(cityWeather.main.temp_min)}°</p>
          <p>Humidity : {cityWeather.main.humidity}%</p>
        </div>
      </div>

      <div className="border-t border-gray-200 my-4"></div>

      <div className="space-y-1 text-sm">
        <div className="flex items-center gap-5">
          <i className="wi wi-horizon-alt text-3xl text-rose-500"></i>
          <p>Sunrise: {sunrise}</p>
        </div>
        <div className="flex items-center gap-5">
          <i className="wi wi-horizon text-3xl text-rose-500"></i>
          <p>Sunset: {sunset}</p>
        </div>
        <div className="flex items-center gap-5">
          <i className="wi wi-strong-wind text-3xl"></i>
          <p>Wind: {windSpeed} km/h</p>
        </div>
      </div>
      {showAddButton ? (
        <button
          onClick={handleClick}
          className={`mt-10 text-white w-full px-2 py-1 rounded-full cursor-pointer bg-green-600 hover:bg-green-700 ${
            !cityWeather ? "opacity-50 cursos-not-allowed" : ""
          }`}
        >
          Add to my list
        </button>
      ) : null}
    </div>
  );
}
