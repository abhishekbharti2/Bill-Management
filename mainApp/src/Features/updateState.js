import { createSlice } from "@reduxjs/toolkit";
import bills from "../Component/bill.json";

const initialState = {
  data: [...bills],
  month: 'All'
};

export const updateState = createSlice({
  name: "updater",
  initialState,
  reducers: {
    add: (state, action) => {
      const newBill = { id: Date.now(), ...action.payload };
      state.data.push(newBill);
    },

    remove: (state, action) => {
      state.data = state.data.filter((bill) => bill.id !== action.payload);
    },

    changemonth: (state, action) =>{
      state.month = action.payload
    },

    update: (state, action) => {
      const index = state.data.findIndex((bill) => bill.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...action.payload };
      }
    },
  },
});

export const { add, remove, update, changemonth } = updateState.actions;
export default updateState.reducer;
