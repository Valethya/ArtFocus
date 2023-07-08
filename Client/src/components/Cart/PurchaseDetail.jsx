import React, { useEffect, useState } from "react";
import Button from "../Button/Button.jsx";
import apiRequest from "../../services/api.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../services/cartService.js";

export default function PurchaseDetail() {
  const totalProducts = useSelector((state) => state.cart.totalProducts);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const cartId = useSelector((state) => state.user.cartId);
  const dispatch = useDispatch();

  const url = `/api/carts/${cartId}/purchase`;
  async function handlePurchase() {
    const response = await apiRequest(url, "GET");
    fetchCart(`/api/carts/summary/${cartId}`, dispatch);
  }
  return (
    <>
      <h2>Detalles de tu compra</h2>
      <p>Total de prodcutos:{totalProducts}</p>
      <p>Valor total:{totalPrice}</p>
      <Button handle={handlePurchase}>Finalizar compra</Button>
    </>
  );
}
