import React from "react";
import ItemListCart from "./ItemListCarts.jsx";
import PurchaseDetail from "./PurchaseDetail.jsx";
import Frame from "../Frame/Frame.jsx";

export default function Cart() {
  return (
    <div className="cart">
      <ItemListCart></ItemListCart>
      <Frame>
        <PurchaseDetail></PurchaseDetail>
      </Frame>
    </div>
  );
}
