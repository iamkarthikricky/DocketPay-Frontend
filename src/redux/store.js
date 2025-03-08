import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import docketPayReducer from './docketPaySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    docketPay:docketPayReducer
  },
});
