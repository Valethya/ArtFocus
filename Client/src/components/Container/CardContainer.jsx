import React, { useState, useEffect, useContext } from "react";
import Card from "../Card/Card";
import Pagination from "../Pagination/pagination";
import FilterBar from "../FilterBar/FileterBar.jsx";
import { fetchProducts } from "../../services/productService";

export default function CardContainer() {
  // const { fetchProducts } = useContext(ApiContext);
  const [products, setProducts] = useState([]);
  const [url, setUrl] = useState("/api/products");
  const [page, setPage] = useState("");

  useEffect(() => {
    fetchProducts(url, setPage, setProducts);
  }, [JSON.stringify(url)]);

  function handlePage(urlPage) {
    setUrl(urlPage);
  }

  return (
    <div className="cardContainer">
      <FilterBar url={setUrl} />
      <Card products={products}></Card>
      <Pagination page={page} handle={handlePage} />
    </div>
  );
}
