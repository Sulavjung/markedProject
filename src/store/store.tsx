import { configureStore } from "@reduxjs/toolkit";
import exampleReducer from "@/store/slices/exampleSlices";
import financeReducer from "@/store/slices/bankingSlice";
import { saveState } from "@/utils/localStorage";

const store = configureStore({
  reducer: {
    example: exampleReducer, // Add reducers here
    finance: financeReducer,
  },
});

store.subscribe(() => {
  saveState("register", store.getState().example);
  saveState("Finance", store.getState().finance);
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
