import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Weather } from "../models/weather";
import { fetchWeatherByCity } from "../utils/api";

interface WeatherState {
  weather: Weather[];
  favorites: string[];
  selectedCityWeather: Weather | null;
  isLoading: boolean;
  error: string | null;
}

const savedCities = localStorage.getItem("favoriteCities");

const initialState: WeatherState = {
  weather: [],
  favorites: savedCities ? JSON.parse(savedCities) : [],
  selectedCityWeather: null,
  isLoading: false,
  error: null,
};

// createAsyncThunk<ReturnType, ArgumentType, ThunkApiConfig>(
export const fetchWeatherForSelectedCity = createAsyncThunk<
  Weather,
  string,
  { rejectValue: string }
>("weather/fetchWeatherForSelectedCity", fetchWeatherByCity);

export const fetchWeatherForFavorites = createAsyncThunk<
  Weather,
  string,
  { rejectValue: string }
>("weather/fetchWeatherForFavorites", fetchWeatherByCity);

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
    addFavorite: (state, action: PayloadAction<string>) => {
      const favCity = action.payload;

      if (!state.favorites.includes(favCity)) {
        state.favorites.push(favCity);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (cityName) => cityName !== action.payload
      );
    },
    clearSelectedCityWeather: (state) => {
      state.selectedCityWeather = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherForSelectedCity.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWeatherForSelectedCity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedCityWeather = action.payload;
        state.error = null;
      })
      .addCase(fetchWeatherForSelectedCity.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload || action.error.message || "Failed to fetch data";
        state.selectedCityWeather = null;
      })
      .addCase(fetchWeatherForFavorites.fulfilled, (state, action) => {
        const newCity = action.payload;
        const index = state.weather.findIndex((city) => city.id === newCity.id);
        if (index >= 0) {
          state.weather[index] = newCity;
        } else {
          state.weather.push(newCity);
        }
      });
  },
});

export const {
  addWeather,
  removeWeather,
  addFavorite,
  removeFavorite,
  clearSelectedCityWeather,
} = weatherSlice.actions;

export default weatherSlice.reducer;
