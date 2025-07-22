import { useEffect, useState } from "react";
import { API_URL } from "../utils/api";
import type { Forecast } from "../models/forecast";

export default function Forecast() {
  const [city, setCity] = useState<string>("Paris");
  const [forecast, setForecast] = useState<Forecast | null>(null);

  const getForecast = async (city: string) => {
    console.log("Fetching forecast for:", city);
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

  useEffect(() => {
    getForecast(city);
  }, [city]);

  return (
    <div className="pt-20 text-white px-10  mb-10">
      <h3>Forecast</h3>
      <p>City: {city}</p>
      <p>Status {forecast?.cod}</p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {forecast?.list.map((fc) => (
          <li className="border bg-white text-slate-900 rounded-md" key={fc.dt}>
            <p>{fc.dt_txt}</p>
            <p>{Math.round(fc.main.temp)}°</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
