import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Weather } from "../models/weather";

interface WeatherState {
  weather: Weather[];
}

const initialState: WeatherState = {
  weather: [],
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    addWeather: (state, action: PayloadAction<Weather>) => {
      const newCity = action.payload;

      const alreadyExists = state.weather.some(
        (city) => city.name.toLowerCase() === newCity.name.toLowerCase()
      );

      if (!alreadyExists) {
        state.weather.push(newCity);
      }
    },
  },
});

export const { addWeather } = weatherSlice.actions;

export default weatherSlice.reducer;
