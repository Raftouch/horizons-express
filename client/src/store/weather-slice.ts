import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Weather } from "../models/weather";
import { API_URL } from "../utils/api";

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
export const fetchWeather = createAsyncThunk<
  Weather,
  string,
  { rejectValue: string }
>("weather/fetchWeather", async (city: string, thunkAPI) => {
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
});

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedCityWeather = action.payload;
        state.error = null;

        const index = state.weather.findIndex(
          (city) => city.id === action.payload.id
        );
        if (index >= 0) {
          state.weather[index] = action.payload;
        } else {
          state.weather.push(action.payload);
        }
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload || action.error.message || "Failed to fetch data";
        state.selectedCityWeather = null;
      });
  },
});

export const { addWeather, removeWeather, addFavorite, removeFavorite } =
  weatherSlice.actions;

export default weatherSlice.reducer;
