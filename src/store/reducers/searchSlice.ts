import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchValue: "",
    results: [],
    loading: false,
  },
  reducers: {
    saveSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

export const { saveSearchValue } = searchSlice.actions;
export default searchSlice.reducer;
