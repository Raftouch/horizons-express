import { useState } from "react";
import { API_URL } from "../utils/api";
import type { Forecast } from "../models/forecast";
import Search from "./Search";
import ForecastCard from "./ForecastCard";

export default function Forecast() {
  const [city, setCity] = useState<string>("");
  const [forecast, setForecast] = useState<Forecast | null>(null);

  const getForecast = async (city: string) => {
    // console.log("Fetching forecast for:", city);
    try {
      const res = await fetch(`${API_URL}/weekly-forecast?city=${city}`);
      //   const res = await fetch(`${API_URL}/weekly-forecast?city=Lille`);
      const data = await res.json();
      console.log("DATA : ", data);
      setForecast(data);
    } catch (error) {
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
    <div className="flex flex-col items-center pt-20 text-white px-10 mb-10">
      <Search
        city={city}
        handleCityChange={handleChange}
        handleCitySearch={handleSearch}
      />
      <h3 className="mb-4">
        5 days detailed forecast{" "}
        {forecast && <span>for {forecast?.city?.name}</span>}
      </h3>
      {/* <p>Status {forecast?.cod}</p> */}
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-8">
        {Array.isArray(forecast?.list) &&
          forecast?.list.map((fc) => (
            <ForecastCard key={fc.dt} forecast={fc} />
          ))}
      </ul>
    </div>
  );
}
