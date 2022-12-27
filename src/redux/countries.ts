import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Country from "../interfaces/Country";
import { normalizeText } from "normalize-text";

export const fetchData = createAsyncThunk(
  "countries/fetchCountries",
  async (endpoint: string) => {
    const data = (await (await fetch(endpoint)).json()) as Country[];
    return data;
  }
);

export const countriesSlice = createSlice({
  name: "countries",
  initialState: {
    display: [] as Country[],
    original: [] as Country[],
    status: "",
    searchText: "",
    alphaOrder: true,
  },

  reducers: {
    sortByName: (state) => {
      let sortFunction = (x: Country, y: Country) => {
        if (normalizeText(x.name) < normalizeText(y.name))
          return state.alphaOrder ? -1 : 1;
        if (normalizeText(x.name) > normalizeText(y.name))
          return state.alphaOrder ? 1 : -1;
        return 0;
      };
      state.alphaOrder = !state.alphaOrder;
      state.original.sort(sortFunction);
      state.display = state.original;
    },
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
    filterByName: (state, action: { type: string; payload?: string }) => {
      const searchText = action.payload ? action.payload : state.searchText;
      state.display = state.original.filter((country: Country) =>
        normalizeText(country.name).includes(normalizeText(searchText))
      );
    },
    updateSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "idle";
        state.original = action.payload;
        state.display = action.payload;
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { sortBy, filterByName, updateSearchText, sortByName } =
  countriesSlice.actions;

export default countriesSlice.reducer;
