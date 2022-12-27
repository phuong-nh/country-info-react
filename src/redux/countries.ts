import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Country from "../interfaces/Country";

export const fetchData = createAsyncThunk(
  "countries/fetchCountries",
  async (endpoint: string) => {
    const data = (await (await fetch(endpoint)).json()) as Country[];
    return data
  }
);

export const countriesSlice = createSlice({
  name: "countries",
  initialState: {
    display: [] as Country[],
    original: [] as Country[],
    status: ""
  },

  reducers: {
    sortBy: (
      state,
      action: { type: string; payload: { element: string; reverse: boolean } }
    ) => {
      let sortFunction = (x: Country, y: Country) => {
        let xValue = x[action.payload.element as keyof Country];
        let yValue = y[action.payload.element as keyof Country];
        if (xValue < yValue) return action.payload.reverse ? -1 : 1;
        if (xValue > yValue) return action.payload.reverse ? 1 : -1;
        return 0;
      };
      state.original.sort(sortFunction);
      state.display = state.original;
    },
    filterByName: (state, action: { type: string; payload: string }) => {
      state.display = state.original.filter((country: Country) =>
        country.name.includes(action.payload)
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {state.status = 'loading'})
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'idle'
        state.original = action.payload
        state.display = action.payload
      })
      .addCase(fetchData.rejected, (state) => {state.status = 'failed'})
  }
});

export const { sortBy, filterByName } = countriesSlice.actions;

export default countriesSlice.reducer;
