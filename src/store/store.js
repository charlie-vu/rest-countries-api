import { configureStore } from "@reduxjs/toolkit";
import configSlice from "./configSlice";

const store = configureStore({
    reducer: {
        config: configSlice.reducer,
    }
})

export default store;