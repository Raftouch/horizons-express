import { configureStore } from "@reduxjs/toolkit";
import citiesReducer from "./weather-slice";

const store = configureStore({
  reducer: {
    cities: citiesReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  const favorites = state.cities.favorites;
  localStorage.setItem("favoriteCities", JSON.stringify(favorites));
});

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;

export default store;
