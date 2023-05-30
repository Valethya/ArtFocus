import React from "react";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { ApiContext } from "../../context/ApiContext";

import Icon from "@mui/material/Icon";
import { useDispatch, useSelector } from "react-redux";
import { decrement } from "../../store/slice/conuterSlice";
import apiRequest from "../../services/api";
import fetchSummaryCart from "../../services/cartService";
export function ItemCart() {
  const [summaryCart, setSummaryCart] = useState("");
  const cartId = useSelector((state) => state.user.cartId);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchSummaryCart(setSummaryCart, cartId);
  }, [cartId]);

  async function handleRemove(prod) {
    try {
      const endPoint = `/api/carts/${cartId}/product/${prod}`;
      const response = await apiRequest(endPoint, "DELETE");

      if (response.status == "success") {
        dispatch(decrement());
        fetchSummaryCart(setSummaryCart, cartId);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    summaryCart &&
    summaryCart.map((prod) => {
      return (
        <div className="itemCart shadow" key={prod.productId}>
          <div className="imgCart">
            <img src={prod.thumb}></img>
          </div>
          <div className="cartDetail">
            <h4>
              <b>{prod.title}</b>
            </h4>
            <p>cantidad: {prod.totalQuantity}</p>
            <p>precio: {prod.value}</p>
            <p>total: {prod.totalValue}</p>
            <Icon
              onClick={() => {
                handleRemove(prod.productId);
              }}
            >
              delete
            </Icon>
          </div>
        </div>
      );
    })
  );
}
