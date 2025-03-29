import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosConfig/axiosConfig";

export const fetchTransactions = createAsyncThunk(
  "transactions/fetch",
  async (_, { getState, rejectWithValue }) => {
    const { transactions } = getState(); // ✅ Get existing state
    if (transactions.data.length) return rejectWithValue("Already fetched"); // 🔥 Prevent re-fetching

    try {
      const response = await axiosInstance.get("/user/get-transactions");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch transactions");
    }
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState: { data: [],  
    status: "idle", // Possible values: "idle" | "loading" | "success" | "failure"
 error: null },

  reducers: {
      onAddTransactionInfo: (state, action) => {
        state.data = {...state.data,...action.payload}
      }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = "failure";
        state.error = action.payload;
      });
  },
});

export default transactionSlice.reducer;
