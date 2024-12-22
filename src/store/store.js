import { configureStore } from "@reduxjs/toolkit";
import sidePanelReducer from "./SidepanelSlice";

const store = configureStore({
    reducer: {
        sidePanel: sidePanelReducer,
    }
})

export default store;
