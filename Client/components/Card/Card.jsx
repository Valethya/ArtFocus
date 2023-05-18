import React, { useContext } from "react";
import { useEffect, useState } from "react";
import Button from "../Button/Button";
import { ApiContext } from "../../context/ApiContext";

export default function Card({ products }) {
  // const [data, setData] = useState([]);
  // const [prodId, setProdId] = useState([]);
  const { cartId } = useContext(ApiContext);

  async function fetchData(prod) {
    const url = `http://localhost:8080/api/carts/${cartId}/product/${prod}`;

    try {
      await fetch(url, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error(error);
    }
  }

  function handleAdd(prod) {
    fetchData(prod);
  }
  return products.map((prod) => {
    return (
      <div className="card" key={prod.id}>
        <div className="contentCard">
          <div className="contentImg">
            <img src={prod.thumbnail}></img>
          </div>

          <div>
            <div className="cardTitle">
              <h4>{prod.title}</h4>
            </div>
            <span>$ {prod.price}</span>

            <Button
              handle={() => {
                handleAdd(prod.id);
              }}
            >
              Agregar
            </Button>
          </div>
        </div>
      </div>
    );
  });
}
