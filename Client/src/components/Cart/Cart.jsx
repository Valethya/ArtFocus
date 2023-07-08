import React, { useEffect } from "react";
import ItemListCart from "./ItemListCarts.jsx";
import PurchaseDetail from "./PurchaseDetail.jsx";
import Frame from "../Frame/Frame.jsx";
import { fetchCart } from "../../services/cartService.js";
import { useDispatch, useSelector } from "react-redux";

export default function Cart() {
  const cartId = useSelector((state) => state.user.cartId);
  const dispatch = useDispatch();
  const url = `/api/carts/summary/${cartId}`;
  console.log("hola perro", cartId);
  useEffect(() => {
    console.log("hola!!!");
    fetchCart(url, dispatch);
  }, [cartId]);
  return (
    <div className="cart">
      <ItemListCart></ItemListCart>
      <Frame>
        <PurchaseDetail></PurchaseDetail>
      </Frame>
    </div>
  );
}
