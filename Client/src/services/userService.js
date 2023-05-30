import apiRequest from "./api.js";
import { setCartId, setRole, setUser } from "../store/slice/userSlice.js";

async function fetchCurrent(dispatch) {
  const user = await apiRequest("/session/current");

  const cartId = user.data.cartId;
  const role = user.data.role;

  dispatch(setUser(user.data));
  dispatch(setCartId(cartId));
  dispatch(setRole(role));
  setTimeout(() => {
    dispatch(setUser(""));
    dispatch(setCartId(""));
    dispatch(setRole(""));
  }, 180000);
}
export default fetchCurrent;
