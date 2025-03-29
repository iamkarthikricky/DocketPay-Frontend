import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import docketPayReducer from "./docketPaySlice";
import transactionsReducer from './transactionsSlice';


// 🏗️ Create Store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    docketPay: docketPayReducer,
    transactions: transactionsReducer
  },
  // devTools: process.env.NODE_ENV !== "production", // Disable DevTools in production
});

