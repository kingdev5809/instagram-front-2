import { configureStore } from "@reduxjs/toolkit";
import InstaSlice from "./TheSlice";

const store = configureStore({
  reducer: {
    Slice: InstaSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
