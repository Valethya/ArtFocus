import React from "react";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { ApiContext } from "../../context/ApiContext";

import Icon from "@mui/material/Icon";
export function ItemCart() {
  const [summaryCart, setSummaryCart] = useState("");
  const { cartId } = useContext(ApiContext);
  console.log(summaryCart);
  async function fetchSummaryCart() {
    try {
      const response = await fetch(
        `http://localhost:8080/api/carts/summary/${cartId}`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      const products = data.data;
      products[0]
        ? setSummaryCart(products[0].summaryByProducts)
        : setSummaryCart("");
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchSummaryCart();
  }, [cartId]);

  async function fetchDelete(prod) {
    const url = `http://localhost:8080/api/carts/${cartId}/product/${prod}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
    fetchSummaryCart();
  }

  function handleRemove(prod) {
    fetchDelete(prod);
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
