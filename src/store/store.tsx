import { configureStore } from "@reduxjs/toolkit";
import exampleReducer from "@/store/slices/exampleSlices";

const store = configureStore({
  reducer: {
    example: exampleReducer, // Add reducers here
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
