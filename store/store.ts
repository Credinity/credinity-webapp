import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import mediaReducer from "@/store/slices/mediaSlice";
import pageReducer from "@/store/slices/pageSlice";
import userReducer from "@/store/slices/userSlice";
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
