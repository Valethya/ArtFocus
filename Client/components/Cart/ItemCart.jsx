import React from "react";
import { useState, useEffect } from "react";

export function ItemCart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "http://localhost:8080/api/carts/63f293aad6a291d75d03c98f"
        );
        const data = await response.json();
        const products = data.payload.message;
        setData(products);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  const datito = data.map((prod) => prod);
  return data.map((prod) => {
    return (
      <div className="itemCart shadow" key={prod.product._id}>
        <div className="imgCart">
          <img src={prod.product.thumbnail}></img>
        </div>
        <div className="cartDetail">
          <h4>
            <b>{prod.product.title}</b>
          </h4>
          <p>cantidad: {prod.qty}</p>
          <p>precio: {prod.product.price}</p>
          <p>total: {prod.product.price * prod.qty}</p>
        </div>
      </div>
    );
  });
}
