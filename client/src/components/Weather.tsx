import { useEffect, useState } from "react";

export default function Weather() {
  const [city, setCity] = useState("");
  const [cityData, setCityData] = useState();

  const fetchWeather = async (city: string) => {
    if (!city) return;

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
    fetchWeather(city);
  }, [city]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  return (
    <>
      <input
        type="text"
        value={city}
        placeholder="type city name here"
        onChange={handleChange}
      />
      <div>{JSON.stringify(cityData)}</div>
    </>
  );
}
