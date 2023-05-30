import apiRequest from "./api";

async function fetchSummaryCart(setSummaryCart, cartId) {
  const url = `/api/carts/summary/${cartId}`;
  try {
    const data = await apiRequest(url);
    const products = data.data;

    products[0]
      ? setSummaryCart(products[0].summaryByProducts)
      : setSummaryCart("");
  } catch (error) {
    console.error(error);
  }
}
export default fetchSummaryCart;
