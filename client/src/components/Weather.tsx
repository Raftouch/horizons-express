import { useEffect, useState } from "react";

export default function Weather() {
  const [cityData, setCityData] = useState();

  const fetchWeather = async () => {
    const city = "paris";
    try {
      const response = await fetch(`http://localhost:4000/?city=${city}`);
      const data = await response.json();
      setCityData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching weather", error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return <div>{JSON.stringify(cityData)}</div>;
}
