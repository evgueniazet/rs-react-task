import { combineReducers } from "@reduxjs/toolkit";
import searchReducer from "./reducers/searchSlice";
import loaderReducer from "./reducers/loaderSlice";

const rootReducer = combineReducers({
  search: searchReducer,
  loader: loaderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
