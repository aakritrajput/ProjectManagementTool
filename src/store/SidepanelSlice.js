//import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

const SidePanelSlice = createSlice({
    name: "SidePanel",
    initialState: {status: false},
    reducers: {
        CheckDisplay: (state) => {
            if (state.status === false) {
                state.status = true;
            } else {
                state.status = false;
            }
     }
}})

export const { CheckDisplay } = SidePanelSlice.actions;
export default SidePanelSlice.reducer;