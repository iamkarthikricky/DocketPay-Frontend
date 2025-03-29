import { createSlice} from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") ?? null, // Get token from localStorage
  currentUserInfo:{userEmail:sessionStorage.getItem("userEmail") ?? "user@gmail.com",userName:sessionStorage.getItem("userEmail") ?? "User User"}
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
      const { email, name } = action.payload;
    
      if (email) sessionStorage.setItem("userEmail", email);
      if (name) sessionStorage.setItem("userName", name);
    
      state.currentUserInfo = {
        userEmail: email ?? state.currentUserInfo.userEmail,
        userName: name ?? state.currentUserInfo.userName
      };
    }
  },
});

export const { login, logout,updateUserInfo } = authSlice.actions;
export default authSlice.reducer;
