import { useState } from "react";
import { API_URL } from "../utils/api";
import type { Forecast } from "../models/forecast";
import Search from "./Search";
import ForecastCard from "./ForecastCard";

export default function Forecast() {
  const [city, setCity] = useState<string>("");
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getForecast = async (city: string) => {
    // console.log("Fetching forecast for:", city);
    try {
      setError(null);
      const res = await fetch(`${API_URL}/weekly-forecast?city=${city}`);
      const data = await res.json();

      if (data.cod === "404") {
        setError(data.message);
        setForecast(null);
        return;
      }
      console.log("DATA : ", data);
      setForecast(data);
    } catch (error) {
      setError("Error fetching forecast");
      setForecast(null);
      console.error(error);
    }
  };

  //   useEffect(() => {
  //     getForecast(city);
  //   }, [city]);

  //   const dispatch = useDispatch<AddDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    getForecast(city);
  };

  return (
    <div className="flex flex-col items-center text-white px-10 mb-10">
      <Search
        city={city}
        handleCityChange={handleChange}
        handleCitySearch={handleSearch}
      />
      <h3 className="mb-4">
        5 days detailed forecast{" "}
        {forecast?.city?.name ? <span>for {forecast?.city?.name}</span> : null}
      </h3>

      {error ? <p className="text-red-500">{error}</p> : null}

      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-8">
        {Array.isArray(forecast?.list) &&
          forecast?.list.map((fc) => (
            <ForecastCard key={fc.dt} forecast={fc} />
          ))}
      </ul>
    </div>
  );
}
