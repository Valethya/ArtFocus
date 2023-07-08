import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  summary: null,
  totalProducts: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setSummary: (state, action) => {
      state.summary = action.payload;
    },
    setTotalProducts: (state, action) => {
      state.totalProducts = action.payload;
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
  },
});

export const { setSummary, setTotalProducts, setTotalPrice } =
  cartSlice.actions;

export default cartSlice.reducer;
