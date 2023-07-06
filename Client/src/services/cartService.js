import apiRequest from "./api";

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

export default fetchSummaryCartByProduct;
