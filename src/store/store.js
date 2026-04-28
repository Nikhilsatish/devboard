import { createStore } from "redux";

const ADD_BOOKMARK = "bookmarks/add";
const REMOVE_BOOKMARK = "bookmarks/remove";

export function addBookmark(repo) {
  return { type: ADD_BOOKMARK, payload: repo };
}

export function removeBookmark(repoId) {
  return { type: REMOVE_BOOKMARK, payload: repoId };
}

function bookmarksReducer(state = [], action) {
  switch (action.type) {
    case ADD_BOOKMARK:
      return [...state, action.payload];

    case REMOVE_BOOKMARK:
      return state.filter((r) => r.id !== action.payload);

    default:
      return state;
  }
}

const store = createStore(bookmarksReducer);

export default store;
