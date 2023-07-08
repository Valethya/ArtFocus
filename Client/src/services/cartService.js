import apiRequest from "./api";
import {
  setSummary,
  setTotalPrice,
  setTotalProducts,
} from "../store/slice/cartSlice";
async function fetchSummaryCartByProduct(setSummaryProductInCart, cartId) {
  const url = `/api/carts/summary/${cartId}`;
  try {
    const data = await apiRequest(url);
    const products = data.data;

    products[0]
      ? setSummaryProductInCart(products[0].summaryByProducts)
      : setSummaryProductInCart("");
  } catch (error) {
    console.error(error);
  }
}

export async function fetchSummaryCart(setSummaryCart, cartId) {
  const url = `/api/carts/summary/${cartId}`;
  try {
    const data = await apiRequest(url);
    const products = data.data;

    products[0] ? setSummaryCart(products) : setSummaryCart("");
  } catch (error) {
    console.error(error);
  }
}
export async function fetchCart(url, dispatch) {
  try {
    const data = await apiRequest(url);
    const products = data.data;

    console.log(products, "veamos");
    if (products.length > 0) {
      dispatch(setSummary(products[0].summaryByProducts));
      dispatch(setTotalProducts(products[0].totalQuantity));
      dispatch(setTotalPrice(products[0].totalValue));
    } else {
      dispatch(setSummary(null));
      dispatch(setTotalProducts(0));
      dispatch(setTotalPrice(0));
    }
  } catch (error) {
    console.log(error);
  }
}

export default fetchSummaryCartByProduct;
