import apiRequest from "./api.js";
import { setCartId, setRole, setUser } from "../store/slice/userSlice.js";

async function fetchCurrent(dispatch) {
  const user = await apiRequest("/session/current");
  if (user.data) {
    const cartId = user.data.cartId;
    const role = user.data.role;

    dispatch(setUser(user.data));
    dispatch(setCartId(cartId));
    dispatch(setRole(role));
    setTimeout(() => {
      dispatch(setUser(""));
      dispatch(setCartId(""));
      dispatch(setRole(""));
    }, 3600000);
  } else {
    dispatch(setUser(""));
    dispatch(setCartId(""));
    dispatch(setRole(""));
  }
}
export default fetchCurrent;

export async function fetchUsers(url, setUsers) {
  try {
    const data = await apiRequest(url);
    // setPage(data.data);
    console.log(data.data, "veamos!!!");
    setUsers(data.data);
  } catch (error) {
    console.log(error);
  }
}
