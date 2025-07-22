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
    <div className="pt-20 text-white">
      <h3>Forecast</h3>
      <p>City: {city}</p>
      <p>Status {forecast?.cod}</p>
      <ul>
        {forecast?.list.map((fc) => (
          <li key={fc.dt}>{fc.dt_txt}</li>
        ))}
      </ul>
    </div>
  );
}
