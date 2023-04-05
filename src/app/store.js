import { configureStore } from "@reduxjs/toolkit";
import allReducer from "../features/slices/allSlice";
import favouriteReducer from "../features/slices/favouriteSlice"
import navigationReducer from "../features/slices/navigationSlice"

export const store = configureStore({
  reducer: {
    all: allReducer,
    favourite: favouriteReducer,
    navigateData:navigationReducer
   
  },
});
