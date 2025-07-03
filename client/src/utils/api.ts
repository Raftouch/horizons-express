export const API_URL = "http://localhost:4000";

export const fetchWeatherByCity = async (city: string, thunkAPI: any) => {
  if (!city) return;

  try {
    const response = await fetch(`${API_URL}/?city=${city}`);
    const data = await response.json();

    if (data.cod === "404") {
      return thunkAPI.rejectWithValue(data.message);
    }

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("An error occured while fetching data");
  }
};
