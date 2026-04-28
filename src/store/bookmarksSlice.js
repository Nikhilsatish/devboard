import { createSlice } from "@reduxjs/toolkit";

const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState: [],

  reducers: {
    addBookmark: (state, action) => {
      state.push(action.payload);
    },

    removeBookmark: (state, action) => {
      return state.filter((r) => r.id !== action.payload);
    },
  },
});

export const { addBookmark, removeBookmark } = bookmarksSlice.actions;

export default bookmarksSlice.reducer;
