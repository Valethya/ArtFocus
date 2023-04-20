import React from "react";
import ItemListCart from "./ItemListCarts.jsx";
import PurchaseDetail from "./PurchaseDetail.jsx";

export default function Cart() {
  return (
    <div className="cart">
      <ItemListCart></ItemListCart>
      <PurchaseDetail></PurchaseDetail>
    </div>
  );
}
