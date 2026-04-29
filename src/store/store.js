import { configureStore } from "@reduxjs/toolkit";
import bookmarksReducer from "../features/bookmarks/bookmarksSlice";

const store = configureStore({
  reducer: {
    bookmarks: bookmarksReducer,
  },
});

export default store;
