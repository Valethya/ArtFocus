import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: "", cartId: "", role: "" },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setCartId: (state, action) => {
      state.cartId = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});
export const { setUser, setCartId, setRole } = userSlice.actions;
export default userSlice.reducer;
