import { createSlice} from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") ?? null, // Get token from localStorage
  currentUserInfo:{currentStep:1,userEmail:null}
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload; // Save token to Redux
      localStorage.setItem("token", action.payload); // Store in localStorage
    },
    logout: (state) => {
      state.token = null; // Remove from Redux
      localStorage.removeItem("token"); // Remove from localStorage
    },
    updateUserInfo: (state, action) => {
      state.currentUserInfo = {
        ...state.currentUserInfo, // Preserve existing state
        ...action.payload, // Merge new values
      };    
    }
    
  },
});

export const { login, logout,updateUserInfo } = authSlice.actions;
export default authSlice.reducer;
