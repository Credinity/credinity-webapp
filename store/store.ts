import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import userReducer from "./slices/userSlice";
import pageReducer from "./slices/pageSlice";
import mediaReducer from "./slices/mediaSlice";
//All reducers
const reducers = {
  user: userReducer,
  page: pageReducer,
  media: mediaReducer,
};

export const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV === "development",
});

// export type of root state from reducers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
