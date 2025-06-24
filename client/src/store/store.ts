import { configureStore } from "@reduxjs/toolkit";
import citiesReducer from "./weather-slice";

const store = configureStore({
  reducer: {
    cities: citiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;

export default store;
