import React, { useContext } from "react";
import { useEffect, useState } from "react";
import Button from "../Button/Button";
import { ApiContext } from "../../context/ApiContext";

export default function Card() {
  const [data, setData] = useState([]);
  // const [prodId, setProdId] = useState([]);
  const { cartId } = useContext(ApiContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8080/api/products");
        const data = await response.json();
        setData(data.data.payload);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  async function fetchData(prod) {
    console.log(cartId);
    const url = `http://localhost:8080/api/carts/${cartId}/product/${prod}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }
  function handleAdd(prod) {
    fetchData(prod);
  }
  return data.map((prod) => {
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
