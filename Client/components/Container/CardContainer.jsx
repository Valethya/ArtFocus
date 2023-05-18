import React, { useState, useEffect, useContext } from "react";
import Card from "../Card/Card";
import { ApiContext } from "../../context/ApiContext";
import Pagination from "../Pagination/pagination";
import { useLocation } from "react-router-dom";

export default function CardContainer() {
  const [products, setProducts] = useState([]);
  const [url, setUrl] = useState("http://localhost:8080/api/products");
  const [page, setPage] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        setPage(data.data);
        setProducts(data.data.payload);
        return data.data;
      } catch (error) {
        console.error(error);
      }
    }
    fetchProducts();
  }, [JSON.stringify(url)]);

  function handlePage(urlPage) {
    setUrl(urlPage);
  }

  return (
    <div className="cardContainer">
      <Card products={products}></Card>
      <Pagination page={page} handle={handlePage} />
    </div>
  );
}
