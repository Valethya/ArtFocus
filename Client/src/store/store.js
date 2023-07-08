import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice/conuterSlice.js";
import userReducer from "./slice/userSlice.js";
import cartReducer from "./slice/cartSlice.js";

const store = configureStore({
  reducer: { counter: counterReducer, user: userReducer, cart: cartReducer },
});
export default store;
