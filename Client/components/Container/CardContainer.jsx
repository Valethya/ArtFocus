import React, { useState, useEffect, useContext } from "react";
import Card from "../Card/Card";
import { ApiContext } from "../../context/ApiContext";
import Pagination from "../Pagination/pagination";

export default function CardContainer() {
  const { fetchProducts, urlPage } = useContext(ApiContext);

  useEffect(() => {
    fetchProducts(urlPage);
  }, [JSON.stringify(urlPage)]);
  return (
    <div className="cardContainer">
      <Card></Card>
      <Pagination />
    </div>
  );
}
