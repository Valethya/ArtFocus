import apiRequest from "./api";

export async function fetchProducts(url, setPage, setProducts) {
  // console.log(url, "  desde el fetch");
  try {
    const data = await apiRequest(url);
    setPage(data.data);
    setProducts(data.data.payload);
  } catch (error) {
    console.log(error);
  }
}

export function createUrlFilter(url, role, user) {
  // console.log(url, " url desde filter");
  let filter = "";
  if (url == "/api/products") {
    filter = role == "admin" ? "" : `?owner=${user.email}`;
  } else {
    filter = role == "admin" ? "" : `&owner=${user.email}`;
  }
  // console.log(`${url}${filter}`, "   desde create filter");
  return `${url}${filter}`;
}
