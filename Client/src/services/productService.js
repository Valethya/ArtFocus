import apiRequest from "./api";

export async function fetchProducts(url, setPage, setProducts) {
  try {
    const data = await apiRequest(url);
    setPage(data.data);
    setProducts(data.data.payload);
  } catch (error) {
    console.log(error);
  }
}

export function createUrlFilter(url, role, user) {
  let filter = "";
  if (url == "/api/products") {
    filter = role == "admin" ? "" : `?owner=${user.email}`;
  } else {
    filter = role == "admin" ? "" : `&owner=${user.email}`;
  }
  return `${url}${filter}`;
}
