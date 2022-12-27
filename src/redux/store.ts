import { configureStore } from "@reduxjs/toolkit";
import Country from "../interfaces/Country";
import countriesReducer from "./countries";

export const store = configureStore({
  reducer: {
    countries: countriesReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
