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
        (city) => city.id === newCity.id
      );

      if (!alreadyExists) {
        state.weather.push(newCity);
      }
    },
    removeWeather: (state, action: PayloadAction<Weather>) => {
      state.weather = state.weather.filter(
        (city) => city.id !== action.payload.id
      );
    },
  },
});

export const { addWeather, removeWeather } = weatherSlice.actions;

export default weatherSlice.reducer;
