import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isHeaderExpanded: false,
    darkMode: JSON.parse(localStorage.getItem("darkMode")) ?? true,
};

const docketPaySlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        onToggleHeader: (state, action) => {
            state.isHeaderExpanded = action.payload; // Explicitly set true/false
          },
          onToggleTheme: (state) => {
            state.darkMode = !state.darkMode;
            localStorage.setItem("darkMode", JSON.stringify(state.darkMode)); // Store in localStorage
          },    
    }
})

export const {onToggleHeader,onToggleTheme,onFetchTransactions,onAddTransactionInfo} = docketPaySlice.actions;
export default docketPaySlice.reducer;